function CalculatorController($http) {

    this.total = '0';
    this.ShowId = (event) => {
        console.log('total:',this.total);
        let type = event.toElement.attributes[0].nodeValue;
        let val = event.target.value;
        let last = (this.total[this.total.length - 1]  !== undefined) ?  this.total[this.total.length - 1] : '0';
        let lastb = (this.total[this.total.length - 2] !== undefined) ?  this.total[this.total.length - 2] : '0';
        console.log(last,lastb,this.total.length);
        switch (type) {
            case 'c-int':
                (this.total === '0' || this.total === 'ERR') ? this.total = val : this.total += val;
                break;

            case 'c-reset':
                this.total = '0';
                break;

            case 'c-del':
                (this.total.length < 2 || this.total === 'ERR') ? this.total = '0' : this.total = this.total.slice(0, -1);
                break;

            case 'c-action':
                if ( last !== '.' &&  this.total !== 'ERR' && !isNaN(last)){
                    if(val === '-' && (this.total === '0' || this.total === 'ERR')){
                        this.total = val;
                    } else {
                        this.total += val;
                    }

                } else {
                    if (!isNaN(lastb) && val === '-' && last === '-')
                    {
                        this.total = this.total.slice(0, -1);
                        this.total += '+';
                    } else {
                        if (!isNaN(lastb) && val === '-' && last === '+'){
                            this.total += val;
                        }
                    }
                }
                break;
            case 'c-dot':
                if(!isNaN(last)) {
                    this.total += val;
                }
                break;
            case 'c-cal':
                if(!isNaN(last)) {
                    this.doCal();
                }else {
                    this.total = 'ERR'
                }
                break;
            default:
                this.total = 'ERR';
                break;
        }
    };

    this.doCal = (total) => {
        let config = {
            method:'POST',
            url: './db/calc.php',
            data: {
                total:this.total
            }
        };
        $http(config)
            .then( (response) => {
                return response.data;
            }, err => {
                console.log('error :', err);
                this.total = 'ERR';
            }).then((data) => {
            this.total = data.total + '';
           /*console.log(data);*/
        });
    };

}
app.component('calculator', {
    templateUrl: 'calculator/calculator.html',
    controller: CalculatorController,
    controllerAs: 'vm'
});