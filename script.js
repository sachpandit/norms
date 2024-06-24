let images = [];
let currentIndex = 0;
let totalTimer;
let interval;

document.getElementById('startTest').addEventListener('click', startTest);
document.getElementById('imageUpload').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    images = [];
    for (let file of event.target.files) {
        let reader = new FileReader();
        reader.onload = function(e) {
            images.push(e.target.result);
        }
        reader.readAsDataURL(file);
    }
}

function startTest() {
    const questionTime = parseInt(document.getElementById('questionTime').value);
    if (isNaN(questionTime) || images.length === 0) {
        alert('Please upload images and enter a valid time per question.');
        return;
    }
    totalTimer = images.length * questionTime;
    document.querySelector('.upload-section').style.display = 'none';
    document.querySelector('.test-section').style.display = 'flex';
    displayImage();
    displayImageNumbers();
    startTimer();
}

function displayImage() {
    if (currentIndex >= images.length) {
        endTest();
        return;
    }
    document.getElementById('displayedImage').src = images[currentIndex];
}

function displayImageNumbers() {
    const container = document.getElementById('imageNumbers');
    container.innerHTML = '';
    images.forEach((_, index) => {
        const numberBox = document.createElement('div');
        numberBox.classList.add('number-box');
        numberBox.textContent = index + 1;
        numberBox.addEventListener('click', () => {
            currentIndex = index;
            displayImage();
        });
        container.appendChild(numberBox);
    });
}

function startTimer() {
    interval = setInterval(() => {
        if (totalTimer <= 0) {
            endTest();
            return;
        }
        document.getElementById('timer').textContent = formatTime(totalTimer);
        totalTimer--;
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function endTest() {
    clearInterval(interval);
    alert('End of test');
    document.querySelector('.test-section').style.display = 'none';
    document.querySelector('.upload-section').style.display = 'flex';
    document.getElementById('imageUpload').value = '';
    document.getElementById('questionTime').value = '';
    document.getElementById('timer').textContent = '';
    currentIndex = 0;
}
