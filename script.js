function getDate() {
    const now = new Date();
    const day = now.getDay();
    switch (day) {
        case (0): 
        console.log("it's sunday my dudes");
        break;
        case (1): 
        console.log("it's monday my dudes");
        break;
        case (2): 
        console.log("it's tuesday my dudes");
        break;
        case (3): 
        console.log("it's wednesday my dudes");
        break;
        case (4): 
        console.log("it's thursday my dudes");
        break;
        case (5): 
        console.log("it's friday my dudes");
        break;
        case (6): 
        console.log("it's saturday my dudes");
        break;
    }
}

getDate();