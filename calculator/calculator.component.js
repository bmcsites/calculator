function CalculatorController() {

    this.total = '0';
    this.ShowId = (event) => {
        let type = event.toElement.attributes[0].nodeValue;
        let val = event.target.value;
        let last = this.total[this.total.length - 1];
        let lastb = this.total[this.total.length - 2];
        console.log(last,lastb);
        switch (type) {
            case 'c-int':
                (this.total === '0' || this.total === 'ERR') ? this.total = val : this.total += val;
                break;

            case 'c-reset':
                this.total = '0';
                break;

            case 'c-del':
                (this.total.length < 2 || this.total === 'ERR')? this.total = '0' : this.total = this.total.slice(0, -1);
                break;

            case 'c-action':
                if ( last !== '.' &&  this.total !== 'ERR' && !isNaN(last)){
                    this.total += val;
                } else {
                    if ((last === '-' || last === '+') && (val === '-' || val === '+') && last !== val && !isNaN(lastb))
                    {
                        this.total += val;
                    }
                }
                break;
            case 'c-dot':
                if(!isNaN(last)) {
                    this.total += val;
                }
                break;
            default:
                this.total = 'ERR';
                break;
        }
    }


}
app.component('calculator', {
    templateUrl: 'calculator/calculator.html',
    controller: CalculatorController,
    controllerAs: 'vm'
});