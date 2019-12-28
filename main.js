const view = {
  // 顯示 RGB 和 HEX 數值
  showRgbAndHex(red, green, blue) {
    const redValue = document.querySelector('#redValue')
    const greenValue = document.querySelector('#greenValue')
    const blueValue = document.querySelector('#blueValue')
    const hexValue = document.querySelector('#hexValue')

    redValue.textContent = red
    greenValue.textContent = green
    blueValue.textContent = blue

    hexValue.textContent = `#${model.decimalToHex(red)}` +
      `${model.decimalToHex(green)}` +
      `${model.decimalToHex(blue)}`
  },

  // 顯示 body 顏色
  showColor(red, green, blue) {
    const body = document.querySelector('body')
    body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
  }
}

const controller = {
  convertRgbToHex() {
    const colorPanel = document.querySelector('#colorPanel')
    const hexValue = document.querySelector('#hexValue')

    this.setRgbAndHex()
    this.setColorsAndValues()

    // RGB 數值改變時，立即改變顯示顏色和 hex 值
    colorPanel.addEventListener('input', () => {
      this.setRgbAndHex()
      this.setColorsAndValues()
    })

    // 按一下即可複製 hex 值
    hexValue.addEventListener('click', () => {
      this.copyValueToClipboard(event.target)
    })
  },

  // 取得 RGB 數值，存放在 model rgb 內
  setRgbAndHex() {
    const red = document.querySelector('#red')
    const green = document.querySelector('#green')
    const blue = document.querySelector('#blue')

    model.rgb.red = Number(red.value)
    model.rgb.green = Number(green.value)
    model.rgb.blue = Number(blue.value)
  },

  // 套用 model 內的 rgb 數值
  setColorsAndValues() {
    const red = model.rgb.red
    const green = model.rgb.green
    const blue = model.rgb.blue

    view.showRgbAndHex(red, green, blue)
    view.showColor(red, green, blue)
  },

  // 複製 hex 值
  copyValueToClipboard(htmlElement) {
    const input = document.createElement('input')

    input.value = htmlElement.textContent
    htmlElement.append(input)
    input.select()
    document.execCommand('copy')
    input.remove()
    // console.log(input.value)
  }
}

const model = {
  // 儲存 RGB 顏色數值
  rgb: {
    red: 0,
    green: 0,
    blue: 0
  },

  // 把 RGB 數值轉換成 HEX 格式
  decimalToHex(number) {
    const digits = [Math.floor(number / 16), number % 16]
    const hexDigits = digits.map((digit) => {
      switch (digit) {
        case 10:
          return 'A'
        case 11:
          return 'B'
        case 12:
          return 'C'
        case 13:
          return 'D'
        case 14:
          return 'E'
        case 15:
          return 'F'
        default:
          return digit
      }
    })

    return hexDigits.join('')
  }
}

controller.convertRgbToHex()
