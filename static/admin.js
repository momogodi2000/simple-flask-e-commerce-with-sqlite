 //delete user id
 function deleteUser(userId) {
    fetch(`/delete-user/${userId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        // Handle response if needed
        console.log(data);
        // Reload the page after successful deletion
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



    // Function to fetch and display items from Flask
    function fetchItems() {
        fetch('/fetch-items')
            .then(response => response.json())
            .then(data => {
                const itemTableBody = document.getElementById('item-table-body');
                itemTableBody.innerHTML = ''; // Clear previous data

                data.forEach(item => {
                    const row = `
                        <tr>
                            <td>${item.item_id}</td>
                            <td>${item.name}</td>
                            <td>${item.price}</td>
                            <td><img src="/uploads/${item.picture}" alt="${item.name}" width="100"></td>
                            <td>
                                <button onclick="updateItem(${item.item_id})">Update</button>
                                <button onclick="deleteItem(${item.item_id})">Delete</button>
                            </td>
                        </tr>
                    `;
                    itemTableBody.innerHTML += row;
                });
            })
            .catch(error => console.error('Error fetching items:', error));
    }

    // Function to handle form submission for adding a new item
    document.getElementById('add-item-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch('/add-item', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message); // Log response message
                fetchItems(); // Fetch and display updated items
            })
            .catch(error => console.error('Error adding item:', error));
    });

    // Function to handle item deletion
    function deleteItem(itemId) {
        if (confirm('Are you sure you want to delete this item?')) {
            fetch(`/delete-item/${itemId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.ok) {
                        fetchItems(); // Fetch and display updated items
                    } else {
                        alert('Failed to delete item');
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }

    // Function to handle item updating (if needed)
    function updateItem(itemId) {
        // Implement update logic if required
    }

    // Fetch and display items when the page loads
    fetchItems();
    const mobileScreen = window.matchMedia("(max-width: 990px )");
    $(document).ready(function () {
        $(".dashboard-nav-dropdown-toggle").click(function () {
            $(this).closest(".dashboard-nav-dropdown")
                .toggleClass("show")
                .find(".dashboard-nav-dropdown")
                .removeClass("show");
            $(this).parent()
                .siblings()
                .removeClass("show");
        });
        $(".menu-toggle").click(function () {
            if (mobileScreen.matches) {
                $(".dashboard-nav").toggleClass("mobile-show");
            } else {
                $(".dashboard").toggleClass("dashboard-compact");
            }
        });
    });



    // Toggle notification panel
document.querySelector('.notification-icon').addEventListener('click', function() {
    document.querySelector('.notification-panel').classList.toggle('show');
});