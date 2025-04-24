let level = 0; // Start with Level 0 (Shapes)
let shapesData = [
    // Level 0: Shapes (Square, Circle)
    [
        { id: 'square', shape: 'square' },
        { id: 'circle', shape: 'circle' },
    ],
    // Level 1: Animals (Dog, Cat)
    [
        { id: 'dog', shape: 'dog' },
        { id: 'cat', shape: 'cat' },
    ],
    // Level 2: Cars (Car, Truck)
    [
        { id: 'car', shape: 'car' },
        { id: 'truck', shape: 'truck' },
    ]
];

function startGame() {
    document.getElementById("congratsPopup").style.display = "none"; // Hide congratulations popup
    loadLevel(level);
}

function loadLevel(level) {
    document.getElementById("levelTitle").textContent = `Level ${level + 1}`;
    const shapes = shapesData[level];
    
    // Generate shapes to drag
    const shapesContainer = document.getElementById("shapes");
    shapesContainer.innerHTML = '';
    shapes.forEach(shape => {
        let shapeDiv = document.createElement('div');
        shapeDiv.classList.add('shape');
        shapeDiv.draggable = true;
        shapeDiv.setAttribute('data-id', shape.id);
        shapeDiv.setAttribute('data-shape', shape.shape);
        shapeDiv.innerHTML = `<div class="${shape.shape}"></div>`;
        
        shapeDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData("text", e.target.getAttribute('data-id'));
        });
        
        shapesContainer.appendChild(shapeDiv);
    });
    
    // Generate drop areas
    const matchArea = document.getElementById("matchArea");
    matchArea.innerHTML = '';
    shapes.forEach(shape => {
        let dropArea = document.createElement('div');
        dropArea.classList.add('drop-area');
        dropArea.setAttribute('data-id', shape.id);
        
        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedShapeId = e.dataTransfer.getData("text");
            const draggedShape = document.querySelector(`[data-id="${draggedShapeId}"]`);
            const target = e.target;
            
            if (target.getAttribute('data-id') === draggedShape.getAttribute('data-id')) {
                target.appendChild(draggedShape);
                draggedShape.setAttribute("draggable", "false");
                checkCompletion();
            }
        });
        
        matchArea.appendChild(dropArea);
    });
}

function checkCompletion() {
    const dropAreas = document.querySelectorAll('.drop-area');
    let allMatched = true;
    dropAreas.forEach(area => {
        if (!area.hasChildNodes()) {
            allMatched = false;
        }
    });

    if (allMatched) {
        document.getElementById("congratsPopup").style.display = "flex";
    }
}

function nextLevel() {
    level++;
    if (level >= shapesData.length) {
        level = 0;
    }
    startGame();
}

function goHome() {
    window.location.href = '/'; // Redirect to the home page
}

startGame();
