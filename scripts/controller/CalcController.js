class CalcController{
    
    constructor(){

        this._operation     = []    
        this._locale        = "pt-BR"                            // variavel de localização do navegador
        this._displayCalcEl = document.querySelector("#display") // salva os elementos do id #display no atributo _displayCalcEl
        this._dateEl        = document.querySelector("#data")    // salva os elementos do id #data no atributo _dateEl
        this._timeEl        = document.querySelector("#hora")    // salva os elementos do id #hora no atributo _timeEl
        this._currentDate 
        this.initilize()                                         // inicializa data e hora no display
        this.initButtonsEvents()                                 // inicializa o metodo

    }

    initilize(){
        this.setDisplayDateTime() //mostra data e hora no display
        setInterval(()=>{
            this.setDisplayDateTime() // atualiza data e hora 1 vez a cada segundo
        },1000) // tempo em milisegundos 
        
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false)
        })
    }

    clearAll(){
        this._operation = []
    }

    clearEntry(){
        this._operation.pop()
    }

    getLastOperation(){
        return this._operation[this._operation.length -1]
        //console.log(this._operation[this._operation.length -1])
    }

    setLastOperation(value){

        return this._operation[this._operation.length - 1] = value

    }

    isOperator(value){
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1)
    }

    pushOperation(value){
        this._operation.push(value)
        if(this._operation.length > 3){
            
            this.calc()
            console.log(this._operation)
        }
    }

    calc(){
        let last = this._operation.pop()
        let result = eval(this._operation.join(""))
        this._operation = [result, last]
        this.setLastNumberToDisplay()
    }

    setLastNumberToDisplay(){
        let lastNaumber
        for(let i = this._operation.length-1; i>=0; i--){
            if(!this.isOperator(this._operation[i])){
                lastNaumber = this._operation[i]
                break
            }
        }
        this.displayCalc = lastNaumber
    }

    addOperation(value){
        //console.log('____addOperation____')
        
        if(isNaN(this.getLastOperation())){
            //console.log('addOperation 1º if', typeof this.getLastOperation())
            if(this.isOperator(value)){
                //troca operador
                this.setLastOperation(value)
                console.log('addOperation 2º if', value)
            }else if(isNaN(value)){

                 console.log('addOperation 1º else if', value)
             }else{
                 //console.log('addOperation 1º else', typeof value)
                 this.pushOperation(parseInt(value))
                 this.setLastNumberToDisplay()
             }

         }else if(isNaN(value)){
                if(isNaN(this.getLastOperation())){
                    this.getLastOperation()
                }else{
                    this.pushOperation(value)
                }
         }else{
            let newValue = this.getLastOperation().toString() + value.toString()
            this.setLastOperation(parseInt(newValue))
            //console.log('addOperation 2º else', value)
            // atualiza dispplay
            this.setLastNumberToDisplay()
        }

        //console.log("addOperation", this._operation)
    }


    setError(){
        this.displayCalc = "error"
    }

    execBtn(value){
        switch(value){
            case 'ac':
                this.clearAll()
                break

            case 'ce':
                this.clearEntry()
                break

            case 'soma':
                this.addOperation('+')
                //console.log('operador')
                break

            case 'subtracao':
                this.addOperation('-')
                //console.log('operador')
                break

            case 'divisao':
                this.addOperation('/')
                //console.log('operador')
                break

            case 'multiplicacao':
                this.addOperation('*')
                //console.log('operador')
                break

            case 'porcento':
                this.addOperation('%')
                //console.log('operador')
                break
            
            case 'ponto':
                this.addOperation('.')
                //console.log('operador')
                break

            case 'igual':
                
                break
            
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
                //console.log('numero', typeof value)
                break


            default:
                this.setError()
                break
            
        }
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g")

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = (btn.className.baseVal.replace("btn-",""))

                this.execBtn(textBtn)
            })

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = "pointer"
            })
        })
    }

    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }

    get displayTime(){
        return this._timeEl.innerHTML
    }

    set displayTime(value){
        return this._timeEl.innerHTML = value
    }

    get displayDate(){
        return this._dateEl.innerHTML
    }

    set displayDate(value){
        return this._dateEl.innerHTML = value
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML
    }
    
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value
    }

    get currentDate(){
        return new Date()
    }

    set currentDate(value){
        this._currentDate = value
    }

   
}