function trafficLight(color: string) {
    if (color === 'зелений'){ 
        return 'переходьте'
    } else if (color === 'жовтий') {
        return 'приготуйтеся'
    } else if (color === 'червоний') {
        return 'зачекайте'
    }
    return 'Помилка: невірний формат даних'
}

console.log(trafficLight('зелений'));
