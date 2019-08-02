class Avatar {
    static currentAvatar: Avatar;
    xPosCursor: number = 0;
    yPosCursor: number = 0;
    tempImage: number[][] = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    editingQuery: boolean = false;
    editing: boolean = true;
    bPressed: boolean = false;
    abPressed: boolean = false;
    aPressed: boolean = false;

    constructor(key?: string) {
        if (key != "blank") {
            this.edit();
        }
    }

    edit() {
        Avatar.currentAvatar = this;
        while (this.editing) {
            this.render();
            led.unplot(this.xPosCursor, this.yPosCursor);
            this.intermittentDelay(6);
            led.plot(this.xPosCursor, this.yPosCursor);
            this.intermittentDelay(6);
        }
    }

    render() { // will update to remove unselected
        for (let yIndex = 0; yIndex < 5; yIndex++) {
            for (let xIndex = 0; xIndex < 5; xIndex++) {
                if (this.tempImage[yIndex][xIndex] == 1) {
                    led.plot(xIndex, yIndex);
                } else {
                    led.unplot(xIndex, yIndex);
                }
            }
        }
    }

    intermittentDelay(numFiftyMsDelays: number) {
        for (let n = 0; n < numFiftyMsDelays; n++) {
            basic.pause(50);
        }
    }

    buttonAB() { // add to onButtonPressed AB
        if (this.editingQuery == true) {
            this.editing = false;
            this.editingQuery = false;
        } else {
            if (this.tempImage[this.yPosCursor][this.xPosCursor] == 1) {
                this.tempImage[this.yPosCursor][this.xPosCursor] = 0;
            } else {
                this.tempImage[this.yPosCursor][this.xPosCursor] = 1;
            }
            this.editingQuery = true;
        }
    }

    buttonA() { // add to onButtonPressed A
        this.editingQuery = false;
        led.unplot(this.xPosCursor, this.yPosCursor);
        if (this.xPosCursor < 4) {
            this.xPosCursor++;
        } else {
            this.xPosCursor = 0;
        }
    }

    buttonB() { // add to onButtonPressed B
        this.editingQuery = false;
        led.unplot(this.xPosCursor, this.yPosCursor);
        if (this.yPosCursor < 4) {
            this.yPosCursor++;
        } else {
            this.yPosCursor = 0;
        }
    }

    show() {    // will only turn on LEDs
        for (let y = 0; y < this.tempImage.length; y++) {
            for (let x = 0; x < this.tempImage[0].length; x++) {
                if (this.tempImage[y][x] == 1) {
                    led.plot(x, y);
                }
            }
        }
    }
}

basic.forever(function () {
    input.onButtonPressed(Button.A, function () {
        Avatar.currentAvatar.buttonA();
    })
    input.onButtonPressed(Button.B, function () {
        Avatar.currentAvatar.buttonB();
    })
    input.onButtonPressed(Button.AB, function () {
        Avatar.currentAvatar.buttonAB();
    })
})