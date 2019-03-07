let a = 12;

function test(){
    let a = 23;
    this.te = function(){
        console.log(a);
    }
}


var b = new test();

b.te()