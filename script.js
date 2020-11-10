const NUMBER = 85
const SPEED = 1
const DIST = 85

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const points =[]

for (let i = 0; i < NUMBER; i++) {
  const point = {
    x: getRandom(0, canvas.width),
    y: getRandom(0, canvas.height),
    angle:getRandom(0, 1 * Math.PI)
  }

  points.push(point)
}

tick ()

function tick (){
  drawBackground ()
  drawPoints()
  movePoints()
  drawLines ()

  requestAnimationFrame(tick)
}

function drawLines () {
  for (let i = 0; i < NUMBER - 1; i++) {
    for (let j = i + 1; j < NUMBER; j++ ) {
      const pointA = points[i]
      const pointB = points[j]
      const dist = getDist(pointA, pointB)

      if (dist <= DIST) {
        context.strokeStyle = '#a961d8'
        context.lineWidth = (0.5 - dist / DIST)**3
        context.moveTo(pointA.x, pointA.y)
        context.lineTo(pointB.x, pointB.y)
        context.stroke()
      }
    }
  }
}

function getRandom (min, max) {
  return min + Math.random() * (max - min + 1)
}

function drawBackground (){
  context.fillStyle = '#242526'
  context.fillRect(0, 0, canvas.width, canvas.height)
}

function drawPoints () {
  for (const point of points) {
    context.beginPath()
    context.fillStyle = 'white'
    context.arc(point.x, point.y, 1, 0, Math.PI * 2)
    context.fill()
  }
}

function movePoints () {
  for (const point of points) {
    point.x = point.x + SPEED * Math.cos(point.angle)
    point.y = point.y + SPEED * Math.sin(point.angle)

    if (point.x < 0) {
      point.x = canvas.width + point.x
    }
    if ( point.x > canvas.width) {
      point.x = canvas.width - point.x
    }
    if ( point.y < 0) {
      point.y = canvas.height + point.y
    }
    if ( point.y > canvas.height) {
      point.y =  point.y - canvas.height
    }
  }
}

function getDist (a,b) {
  return ((a.x - b.x)**2 + (a.y -b.y)**2)**0.5
}
