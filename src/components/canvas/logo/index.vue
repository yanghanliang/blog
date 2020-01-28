<template>
    <canvas id="canvas"></canvas>
</template>

<script>
export default {
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let My = function () {
                this.canvas = document.querySelector('#canvas')
                this.ctx = this.canvas.getContext('2d')
                this.width = 200
                this.height = 200
                this.canvasInfo = this.canvas.getBoundingClientRect()
                this.x = null
                this.y = null

                this.init()
            }

            My.prototype.init = function () {
                // 设置盒子大小
                this.setBoxSize()
                this.start()
            }

            My.prototype.start = function () {
                // 设置渐变
                // let grd = this.ctx.createLinearGradient(0, 0, 200, 200)
                // grd.addColorStop(0, "#53caa2")
                // grd.addColorStop(0.7, "#3ab98e")
                // grd.addColorStop(1, "#138e65")

                // this.ctx.strokeStyle = grd
                // this.ctx.lineWidth = 2

                this.ctx.fillStyle = '#30a27c'; 
                this.ctx.shadowOffsetX = 10; // 阴影Y轴偏移
                this.ctx.shadowOffsetY = 10; // 阴影X轴偏移
                this.ctx.shadowBlur = 14; // 模糊尺寸
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // 颜色 rgba(0, 0, 0, 0.5)

                let data = [
                    this.getCoordinate({ angle: 0, radius: 2 }),
                    this.getCoordinate({ angle: 90, radius: 4 }),
                    this.getCoordinate({ angle: 180, radius: 6 }),
                    this.getCoordinate({ angle: 270, radius: 8 }),
                    this.getCoordinate({ angle: 360, radius: 10 }),
                    this.getCoordinate({ angle: 0, radius: 10 }),
                    this.getCoordinate({ angle: 90, radius: 12 }),
                    this.getCoordinate({ angle: 180, radius: 14 }),
                    this.getCoordinate({ angle: 270, radius: 16 }),
                    this.getCoordinate({ angle: 360, radius: 18 }),
                    this.getCoordinate({ angle: 0, radius: 18 }),
                    this.getCoordinate({ angle: 90, radius: 22 }),
                    this.getCoordinate({ angle: 180, radius: 26 }),
                    this.getCoordinate({ angle: 270, radius: 30 }),
                    this.getCoordinate({ angle: 360, radius: 34 }),
                    this.getCoordinate({ angle: 0, radius: 34 }),
                    this.getCoordinate({ angle: 90, radius: 38 }),
                    this.getCoordinate({ angle: 180, radius: 50 }),
                ]

                for (let i = 0, length = data.length; i < length; i++) {
                    let next = data[i + 1]
                    if (next) {
                        this.drawCurvePath({
                            start: data[i],
                            end: next,
                            curveness: 0.5
                        })
                    }
                }

                this.ctx.fill()

                this.drawCurvePath({
                    start: this.getCoordinate({ angle: 180, radius: 50 }),
                    end: this.getCoordinate({ angle: 200, radius: 70 }),
                    curveness: -0.2
                })

                this.drawCurvePath({
                    start: this.getCoordinate({ angle: 200, radius: 70 }),
                    end: this.getCoordinate({ angle: 210, radius: 60 }),
                    curveness: 0.6
                })

                this.drawCurvePath({
                    start: this.getCoordinate({ angle: 210, radius: 60 }),
                    end: this.getCoordinate({ angle: 185, radius: 35 }),
                    curveness: 0.2
                })

                this.drawCurvePath({
                    start: this.getCoordinate({ angle: 185, radius: 35 }),
                    end: this.getCoordinate({ angle: 90, radius: 25 }),
                    curveness: -0.3
                })

                this.drawCurvePath({
                    start: this.getCoordinate({ angle: 90, radius: 25 }),
                    end: this.getCoordinate({ angle: 20, radius: 65 }),
                    curveness: -0.2
                })

                // 弯
                this.drawCurvePath({
                    start: this.getCoordinate({ angle: 20, radius: 65 }),
                    end: this.getCoordinate({ angle: 30, radius: 70 }),
                    curveness: 0.2
                })

                this.drawCurvePath({
                    start: this.getCoordinate({ angle: 30, radius: 70 }),
                    end: this.getCoordinate({ angle: 125, radius: 45 }),
                    curveness: 0.2
                })

                // 触角
                this.drawCurvePath({
                    start: this.getCoordinate({ angle: 210, radius: 65 }),
                    end: this.getCoordinate({ angle: 250, radius: 70 }),
                    curveness: -0.1
                })

                this.drawCurvePath({
                    start: this.getCoordinate({ angle: 210, radius: 65 }),
                    end: this.getCoordinate({ angle: 230, radius: 70 }),
                    curveness: -0.2
                })

                this.ctx.fill()
            }

            // 设置盒子大小
            My.prototype.setBoxSize = function () {
                this.canvas.setAttribute('width', this.width)
                this.canvas.setAttribute('height', this.height)
            }

            /**
             * 获取贝塞尔曲线的控制点坐标
             * param {object} params
             * param {number} params.x1 开始位置的 x 轴坐标
             * param {number} params.y1 开始位置的 y 轴坐标
             * param {number} params.x2 结束位置的 x 轴坐标
             * param {number} params.y2 结束位置的 y 轴坐标
             */
            My.prototype.getBessel = function (params) {
                return {
                    x: params.x2,
                    y: params.y1
                }
                return {
                    x: params.x1,
                    y: params.y2
                }
            }

            /**
             * 绘制一条曲线路径
             * @param  {object} params
             * @param  {object} params.start 起点
             * @param  {object} params.end 终点
             * @param  {number} params.curveness 曲度(0-1)
             */
            My.prototype.drawCurvePath = function (params) {
                // 计算中间控制点
                let cp = {
                    x: (params.start.x + params.end.x) / 2 - (params.start.y - params.end.y) * params.curveness,
                    y: (params.start.y + params.end.y) / 2 - (params.end.x - params.start.x) * params.curveness
                }
                this.ctx.moveTo(params.start.x, params.start.y)
                this.ctx.quadraticCurveTo(
                    cp.x, cp.y,
                    params.end.x, params.end.y
                )
            }

            /*
            * param {object}   params
            * params {object}  params.start
            * params {object}  params.end
            */
            My.prototype.drawCurvePaths = function(params) {
                let middle = {
                    x: (params.start.x + params.end.x) / 2,
                    y:  params.end.y
                }

                this.ctx.moveTo(params.start.x, params.start.y)
                this.ctx.quadraticCurveTo(
                    middle.x, middle.y,
                    params.end.x, params.end.y
                )
            }

            /*
            * 获取圆上的坐标
            * @param   {object}    params
            * @param   {number}    params.angle   - 角度
            * @param   {number}    params.radius  - 半径
            * @param   {number}    params.x       - 圆心坐标
            * @param   {number}    params.y       - 圆心坐标
            * @return  {object} coordinate 坐标 { x: value, y: value }
            */
            My.prototype.getCoordinate = function (params) {
                // 没有设置圆心时， 居中显示
                if(!params.x || !params.y) {
                    params.x = this.width / 2
                    params.y = this.height / 2
                }

                let sAngle = 0
                let rightAngle = params.radius / Math.sin(2 * Math.PI / 360 * 90) // 直角

                if (params.angle <= 90) {
                    sAngle = 90 - params.angle
                    return {
                        x: params.x + Math.sin(2 * Math.PI / 360 * sAngle) * rightAngle,
                        y: params.y + Math.sin(2 * Math.PI / 360 * params.angle) * rightAngle
                    }
                } else if (params.angle <= 180) {
                    sAngle = 90 - (180 - params.angle)
                    return {
                        x: params.x - Math.sin(2 * Math.PI / 360 * sAngle) * rightAngle,
                        y: params.y + Math.sin(2 * Math.PI / 360 * (180 - params.angle)) * rightAngle
                    }
                } else if (params.angle <= 270) {
                    sAngle = 270 - params.angle
                    return {
                        x: params.x - Math.sin(2 * Math.PI / 360 * sAngle) * rightAngle,
                        y: params.y - Math.sin(2 * Math.PI / 360 * (180 - sAngle - 90)) * rightAngle
                    }
                } else if (params.angle <= 360) {
                    sAngle = 90 - (360 - params.angle)
                    return {
                        x: params.x + Math.sin(2 * Math.PI / 360 * sAngle) * rightAngle,
                        y: params.y - Math.sin(2 * Math.PI / 360 * (360 - params.angle)) * rightAngle
                    }
                }
            }

            new My()
        }
    }
}
</script>

<style lang="scss" scoped>
    canvas {
        // background-color: #3d5f53; /* #21a579 #105d43 #3d5f53 */
        position: relative;
    }
</style>