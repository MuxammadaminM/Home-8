document.addEventListener('DOMContentLoaded', () => {
    const roomSelect = document.getElementById('room');
    const guestList = document.getElementById('guestList');
    const bookingForm = document.getElementById('bookingForm');
    let rooms = [...Array(15).keys()].map(i => ({ number: i + 1, booked: false }));
    let guests = [];

    function updateRoomSelect() {
        roomSelect.innerHTML = '';
        rooms.forEach(room => {
            if (!room.booked) {
                const option = document.createElement('option');
                option.value = room.number;
                option.textContent = `Xona ${room.number}`;
                roomSelect.appendChild(option);
            }
        });
    }

    function updateGuestList() {
        guestList.innerHTML = '';
        guests.forEach(guest => {
            const li = document.createElement('li');
            li.textContent = `Xona ${guest.room} - ${guest.name}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'O\'chirish';
            deleteButton.onclick = () => {
                rooms[guest.room - 1].booked = false;
                guests = guests.filter(g => g !== guest);
                updateRoomSelect();
                updateGuestList();
            };
            li.appendChild(deleteButton);
            guestList.appendChild(li);
        });
    }

    bookingForm.onsubmit = (event) => {
        event.preventDefault();
        const roomNumber = parseInt(roomSelect.value);
        const guestName = document.getElementById('name').value;
        rooms[roomNumber - 1].booked = true;
        guests.push({ room: roomNumber, name: guestName });
        updateRoomSelect();
        updateGuestList();
        bookingForm.reset();
    };

    updateRoomSelect();
});
