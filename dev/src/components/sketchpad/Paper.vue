<!-- =================================================
 Vue Template
================================================== -->
<template>
  <v-touch
    id="sketchpad-paper"
    :style="{'width': width + 'px', 'height': height + 'px'}"
    @touchstart.native.prevent="mouseDown"
    @touchend.native.prevent="mouseUp"
    @touchcancel.native="mouseLeave">

  </v-touch>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import p5 from 'p5'
import MixinMaterials from '@/mixins/materials.js'
import s from '@/components/living-room/store_sketch.js'

export default {
  name: 'sketchpad-paper',
  mixins: [MixinMaterials],
  data () {
    return {
      p5Instance: null,
      sharedPaths: [],
      elev: 0,
      isMouseDownOnPaper: false
    }
  },
  props: {
    width: Number,
    height: Number,
    pause: Boolean,
    toolbarButtonInput: Object
  },
  mounted () {
    console.log('paper mounted')

    this.sharedPaths = s.store.getSharedPaths()
    this.createP5instance()
  },
  beforeDestroy () {
    console.log('paper before destroy')

    // when leaving this page, store the shared paths
    s.store.setSharedPaths(this.sharedPaths)
    // this.p5Instance.remove()
  },
  watch: {
    toolbarButtonInput (data) {
      console.log('watched toolbarButtonInput: ', data)

      switch (data.id) {
        case 'tool':
          this.p5Instance.changeTool(data.val)
          break
        case 'style':
          this.p5Instance.changeStyle(data.val)
          break
        case 'thickness':
          this.p5Instance.changeThickness(data.val)
          break
        case 'color':
          this.p5Instance.changeColor(data.val)
          break
        case 'clear':
          this.p5Instance.clearAll()
          break
        case 'undo':
          this.p5Instance.undo()
          break
      }
    }
  },
  methods: {
    mouseDown (e) {
      this.isMouseDownOnPaper = true
    },
    mouseUp () {
      this.isMouseDownOnPaper = false
    },
    mouseLeave () {
      this.isMouseDownOnPaper = false
    },
    createP5instance () {
      const props = this.$props
      const el    = this.$el
      const data  = this.$data

      // p5 instance setup
      // *********************************************************************
      let sketch = function (p) {
        // variables
        let bgColor
        let drawing = false
        let paths
        let vGridLines = []; let hGridLines = []; const gridInterval = 20
        let selectedTool, selectedStyle, selectedThickness, selectedColor
        const thin = 2; const medium = 4; const thick = 12; const veryThick = 30
        let blackColor, redColor, blueColor, yellowColor, greenColor, whiteColor
        let drawingStraightLine = false; let drawingRectangle = false

        // define line object ----------------------
        let Line = function (start, thickness, color) {
          this.className = 'Line'
          this.vertices = [start]
          this.thickness = thickness
          this.color = color
        }

        // define line member methods ----------------------
        Line.prototype.display = function () {
          p.stroke(this.color)
          p.strokeWeight(this.thickness)

          for (let i = 1; i < this.vertices.length; i++) {
            p.line(this.vertices[i - 1].x, this.vertices[i - 1].y, this.vertices[i].x, this.vertices[i].y)
          }
        }

        // define rectangle object ----------------------
        let Rectangle = function (start, thickness, color) {
          this.className = 'Rectangle'
          this.start = start
          this.end = start
          this.thickness = thickness
          this.color = color
        }

        // define rectangle member methods ----------------------
        Rectangle.prototype.display = function () {
          p.noFill()
          p.stroke(this.color)
          p.strokeWeight(this.thickness)

          p.rect(this.start.x, this.start.y, this.end.x, this.end.y)
        }

        // ============ setup () ============
        p.setup = function () {
          console.log('sketchpad paper has been initialized')

          // setup environment
          p.createCanvas(props.width, props.height)
          p.colorMode(p.HSB, 360, 100, 100, 1.0)
          p.rectMode(p.CORNERS)

          // set color constants
          blackColor  = p.color(0, 0, 5)
          redColor    = p.color(4, 87, 85)
          blueColor   = p.color(253, 80, 37)
          yellowColor = p.color(48, 100, 100)
          greenColor  = p.color(120, 100, 39)
          whiteColor  = p.color(0, 0, 96)

          // set initial values
          bgColor           = whiteColor
          selectedTool      = 'pencil'
          selectedStyle     = 'freehand'
          selectedThickness = medium
          selectedColor     = blackColor

          // generate grid lines
          const gridThickness = 1
          const gridColor = p.color(200, 5, 95)
          p.generateGridLines(gridInterval, gridThickness, gridColor)

          // set shared paths
          paths = data.sharedPaths

          console.log('inherited the shared paths data', paths)
        }

        // ============ draw () ============
        p.draw = function () {
          p.background(bgColor)
          p.showGrid()

          // display paths
          p.displayPaths()

          // display the straight line that you are drawing
          p.displayDrawingStraightLine()

          // display the rectangle that you are drawing
          p.displayDrawingRectangle()
        }

        // ============ generateGridLines () ============
        p.generateGridLines = function (interval, thickness, color) {
          p.strokeWeight(thickness)
          p.stroke(color)

          // add vertical grid lines
          for (let i = 0; i <= p.width; i += interval) {
            let line = new Line({x:i, y:0}, thickness, color)
            line.vertices.push({x:i, y:p.height})
            vGridLines.push(line)
          }

          //  vertical grid lines
          for (let i = 0; i <= p.height; i += interval) {
            let line = new Line({x:0, y:i}, thickness, color)
            line.vertices.push({x:p.width, y:i})
            hGridLines.push(line)
          }
        }

        // ============ showGrid () ============
        p.showGrid = function () {
          // display vertical lines
          for (let vgl of vGridLines) {
            vgl.display()
          }

          // display horizontal lines
          for (let hgl of hGridLines) {
            hgl.display()
          }
        }

        // ============ getClosestGridIntersection () ============
        // return a closest intersection of grid lines
        p.getClosestGridIntersection = function (pos) {
          // check which vertical line is the closest to the given point
          let xRecord = 9999
          let closestVerticalLineX = 0
          for (let vgl of vGridLines) {
            let dist = Math.abs(pos.x - vgl.vertices[0].x)
            if (dist < xRecord) {
              xRecord = dist
              closestVerticalLineX = vgl.vertices[0].x
            }
          }

          // check which horizontal line is the closest to the given point
          let yRecord = 9999
          let closestVerticalLineY = 0
          for (let hgl of hGridLines) {
            let dist = Math.abs(pos.y - hgl.vertices[0].y)
            if (dist < yRecord) {
              yRecord = dist
              closestVerticalLineY = hgl.vertices[0].y
            }
          }

          let closestPoint = {x: closestVerticalLineX, y: closestVerticalLineY}
          return closestPoint
        }

        // ============ displayPaths () ============
        p.displayPaths = function () {
          // this doesn't work with the inherited paths for some reasons
          // ...maybe due to the change of instance's prototype chain
          // for (let path of paths) {
          //   path.display()
          // }

          for (let path of paths) {
            if (path.className === 'Line') {
              // display line paths
              p.stroke(path.color)
              p.strokeWeight(path.thickness)

              for (let i = 1; i < path.vertices.length; i++) {
                p.line(path.vertices[i - 1].x, path.vertices[i - 1].y, path.vertices[i].x, path.vertices[i].y)
              }
            } else if (path.className === 'Rectangle') {
              // display rectangle paths
              p.noFill()
              p.stroke(path.color)
              p.strokeWeight(path.thickness)

              p.rect(path.start.x, path.start.y, path.end.x, path.end.y)
            }
          }
        }

        // ============ displayDrawingStraightLine () ============
        p.displayDrawingStraightLine = function () {
          if (drawingStraightLine) {
            let latest = paths.length - 1
            let line = paths[latest]

            let r = el.getBoundingClientRect()
            let realMouseX = p.getRealMousePos(r.left, p.mouseX)
            let realMouseY = p.getRealMousePos(r.top, p.mouseY)

            p.line(line.vertices[0].x, line.vertices[0].y, realMouseX, realMouseY)
          }
        }

        // ============ displayDrawingRectangle () ============
        p.displayDrawingRectangle = function () {
          if (drawingRectangle) {
            let latest = paths.length - 1
            let rect = paths[latest]
            let r = el.getBoundingClientRect()
            let realMouseX = p.getRealMousePos(r.left, p.mouseX)
            let realMouseY = p.getRealMousePos(r.top, p.mouseY)

            p.noFill()
            p.rect(rect.start.x, rect.start.y, realMouseX, realMouseY)
          }
        }

        // ============ mousePressed () ============
        p.mousePressed = function () {
          // if this sketchpad is paused, don't do anything
          if (props.pause) {
            return
          }

          if (data.isMouseDownOnPaper) {
            let r = el.getBoundingClientRect()
            let x = p.getRealMousePos(r.left, p.mouseX)
            let y = p.getRealMousePos(r.top, p.mouseY)
            let start = {x: x, y: y}
            let thickness = selectedThickness
            let color = selectedColor
            if (selectedTool === 'eraser') color = whiteColor

            // start drawing... it varies based on the style selected
            if (selectedStyle === 'freehand') {
              // freehand
              let line = new Line(start, thickness, color)
              paths.push(line)
            } else if (selectedStyle === 'straight') {
              // straight
              start = p.getClosestGridIntersection(start)
              let line = new Line(start, thickness, color)
              paths.push(line)
              drawingStraightLine = true
            } else if (selectedStyle === 'rectangle') {
              // rectangle
              start = p.getClosestGridIntersection(start)
              let rect = new Rectangle(start, thickness, color)
              paths.push(rect)
              drawingRectangle = true
              console.log('new rect added: ', rect)
            }

            // start drawing
            drawing = true
          }
        }

        // ============ mouseReleased () ============
        p.mouseReleased = function () {
          // if this sketchpad is paused, don't do anything
          if (props.pause) {
            return
          }

          if (drawing) {
            let r = el.getBoundingClientRect()
            let x = p.getRealMousePos(r.left, p.mouseX)
            let y = p.getRealMousePos(r.top, p.mouseY)
            let end = {x: x, y: y}

            // add end point of the line if you are drawing a straight line
            if (selectedStyle === 'straight') {
              end = p.getClosestGridIntersection(end)

              // be sure that the object is line
              let latest = paths.length - 1
              paths[latest].vertices.push(end)

              drawingStraightLine = false
            } else if (selectedStyle === 'rectangle') {
              end = p.getClosestGridIntersection(end)

              // be sure that the object is rectangle
              let latest = paths.length - 1
              paths[latest].end = end

              drawingRectangle = false
            }

            // stop drawing
            drawing = false
            console.log('new path added: ', paths.length)

            // update the shared paths
            data.sharedPaths = paths
          }
        }

        // ============ mouseDragged () ============
        p.mouseDragged = function () {
          // if this sketchpad is paused, don't do anything
          if (props.pause) {
            return
          }

          if (drawing && selectedStyle === 'freehand') {
            // draw a stroke
            let r = el.getBoundingClientRect()
            let x = p.getRealMousePos(r.left, p.mouseX)
            let y = p.getRealMousePos(r.top, p.mouseY)

            let point = {x:x, y:y}
            let latest = paths.length - 1

            // be sure that the object is line
            paths[latest].vertices.push(point)
          }
        }

        // ============ getRealMousePos () ============
        // considering css zoom
        p.getRealMousePos = function (origin, wrongPos) {
          let zoom = document.getElementById('app').style.zoom
          return (wrongPos + origin) / zoom - origin
        }

        // ============ changeTool () ============
        p.changeTool = function (val) {
          selectedTool = val
        }

        // ============ changeStyle () ============
        p.changeStyle = function (val) {
          selectedStyle = val
        }

        // ============ changeThickness () ============
        p.changeThickness = function (val) {
          switch (val) {
            case 'thin':
              selectedThickness = thin
              break
            case 'medium':
              selectedThickness = medium
              break
            case 'thick':
              selectedThickness = thick
              break
            case 'very-thick':
              selectedThickness = veryThick
              break
          }
        }

        // ============ changeColor () ============
        p.changeColor = function (val) {
          switch (val) {
            case 'black':
              selectedColor = blackColor
              break
            case 'red':
              selectedColor = redColor
              break
            case 'blue':
              selectedColor = blueColor
              break
            case 'yellow':
              selectedColor = yellowColor
              break
            case 'green':
              selectedColor = greenColor
              break
          }
        }

        // ============ clearAll () ============
        p.clearAll = function () {
          paths = []

          // update the shared paths
          data.sharedPaths = paths
        }

        // ============ undo () ============
        p.undo = function () {
          if (paths.length > 0) {
            paths.splice(-1, 1)

            // update the shared paths
            data.sharedPaths = paths
          }
        }
      }
      // *********************************************************************

      // append canvas tag under this component
      this.p5Instance = new p5(sketch, 'sketchpad-paper')
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#sketchpad-paper {
  float: left;
}

</style>
