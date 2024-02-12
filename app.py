from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import re
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SECRET_KEY'] = 'cairocoders-ednalan'
# SQLite database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///momo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Users(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), index=True, unique=True)
    email = db.Column(db.String(150), index=True, unique=True)
    password = db.Column(db.String(255), index=True)
    role = db.Column(db.String(50), index=True)

class Item(db.Model):
    __tablename__ = "item"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    qty = db.Column(db.Integer, nullable=False)
    minimum_qty = db.Column(db.Integer, nullable=False)
    max_qty = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(100), nullable=False)

class Contact(db.Model):
    __tablename__ = "contact"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)

@app.route("/")
def welcome():
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    message = ''
    if request.method == 'POST' and 'name' in request.form and 'password' in request.form and 'email' in request.form:
        fullname = request.form['name']
        password = request.form['password']
        email = request.form['email']
        user_exists = Users.query.filter_by(email=email).first() is not None
        if user_exists:
            message = 'Email already exists!'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):  # Using 're' module here
            message = 'Invalid email address'
        elif not fullname or not password or not email:
            message = 'Please fill out the form!'
        else:
            # Hash the password before storing it in the database
            hashed_password = generate_password_hash(password)
            # Check if the registering user is the admin
            if email == 'admin@gmail.com':
                role = 'admin'
            else:
                role = 'user'
            new_user = Users(name=fullname, email=email, password=hashed_password, role=role)
            db.session.add(new_user)
            db.session.commit()
            message = 'You have successfully registered!'
            # Redirect to the appropriate page after successful registration
            if role == 'admin':
                return redirect(url_for('admin'))
            else:
                return redirect(url_for('dashboard'))
    elif request.method == 'POST':
        message = 'Please fill out the form!'
    return render_template('register.html', message=message)

@app.route('/login', methods=['GET', 'POST'])
def login():
    message = ''
    if request.method == 'POST' and 'email' in request.form and 'password' in request.form:
        email = request.form['email']
        password = request.form['password']
        user = Users.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            # Authentication successful, redirect based on user role
            if user.role == 'admin':
                return redirect(url_for('admin'))
            else:
                return redirect(url_for('dashboard'))
        else:
            message = 'Invalid email/password combination'
    return render_template('login.html', message=message)

@app.route('/admin')
def admin():
    users = Users.query.all()  # Fetch all users from the database
    return render_template('admin.html', users=users)  # Pass users to the template

@app.route('/dashboard')
def dashboard():
    # Logic for the dashboard route
    return render_template('dashboard.html')

@app.route('/logout', methods=['POST'])
def logout():
    # Logic to logout the user
    return redirect(url_for('login'))  # Redirect to another page after logout

@app.route('/crud')
def crud():
    return render_template('crud.html')

@app.route('/insert', methods=['POST'])
def insert_data():
    name = request.form['name']
    price = request.form['price']
    qty = request.form['qty']
    minimum_qty = request.form['minimum_qty']
    max_qty = request.form['max_qty']

    # Save the image to the appropriate directory
    image = request.files['image']
    image_path = 'static/image/' + secure_filename(image.filename)
    image.save(image_path)

    # Create a new item object with the provided data
    new_item = Item(name=name, price=price, qty=qty, minimum_qty=minimum_qty, max_qty=max_qty, image=image_path)

    # Add the new item to the database session and commit changes
    db.session.add(new_item)
    db.session.commit()

    return 'Data inserted successfully!'

@app.route('/user')
def user():
    users = Users.query.all()  # Fetch all users from the database
    return render_template('user.html', users=users)  # Pass users to the template

@app.route('/delete_user', methods=['POST'])
def delete_user():
    user_id = request.form.get('user_id')  # Retrieve the user ID from the form data
    user = Users.query.get(user_id)  # Retrieve the user by ID
    if user:
        db.session.delete(user)  # Delete the user from the database
        db.session.commit()  # Commit the changes

    # Redirect back to the admin page after deleting the user
    return redirect(url_for('user'))

@app.route('/items')
def display_items():
    items = Item.query.all()
    return render_template('items.html', items=items)

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
