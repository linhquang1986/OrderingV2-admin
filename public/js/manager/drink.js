

var editDrink = null;
var dataDrink = null;
var expressionsD = [];
var renderTableDrink = data => {
    let drinks = $('#tableDrink');
    drinks.find('tbody').empty();
    for (let i = 0; i < data.length; i++) {
        let index = i + 1;
        let intent = `<tr index="${i}"><td>${index}</td><td>${data[i].name}</td><td>${data[i].price}</td><td>${data[i].menuName}</td><td><button onclick="delDrink('${data[i]._id}')" class='btn btn-danger'>Del</button></td></tr>`
        drinks.append(intent);
    }
    drinks.children('tbody').find('tr').click(e => {
        if (e.target.localName === 'td') {
            let index = e.currentTarget.attributes[0].value;
            editDrink = data[index];
            $('#dirnkName').val(editDrink.name);
            $('#priceDrink').val(editDrink.price);
            $('#menuDrink').val(editDrink.menu).change()
        }
    })
}
var delDrink = (id) => {
    let rs = dataDrink.find(d => { return d._id == id });
    //del drink to database
    _delete('/drink/delDrink/', id, (res) => {
        if (res.success) {
            //del drink to wit ai
            post('/wit/delValue', { entitiId: "drinks", value: rs.name }, res => { })
            getAllDrink();
        }

    })

}
var submitFormDrink = (form) => {
    let error = false;
    let data = $(form).serializeArray();
    let drinkData = {
        name: null,
        price: null,
        menuId: null
    }
    //validate
    new Promise((resolve, reject) => {
        data.forEach(item => {
            if (item.value === "") {
                $(form).find('.error').html('Please complete information').show();
                error = true;
                setTimeout(() => {
                    $(form).find('.error').hide()
                }, 2000)
                return;
            } else {
                if (item.name == "name")
                    drinkData.name = item.value
                if (item.name == "price")
                    drinkData.price = item.value
                if (item.name == "menu")
                    drinkData.menuId = item.value
            }
        });
        resolve(drinkData)
    }).then(rs => {
        //if no error
        if (!error) {
            //check add or edit
            if (!editDrink)
                // add drink to database
                post('/drink/addDrink', drinkData, (res) => {
                    //add drink to wit ai
                    post('/wit/addValue',
                        {
                            entitiId: "drinks",
                            value: drinkData.name,
                            expressions: expressionsD
                        }, res => {
                            console.log(res)
                        })
                    clearForm(form);
                    getAllDrink();
                })
            else {
                //del drink to wit ai
                post('/wit/delValue', { entitiId: "drinks", value: editDrink.name }, res => {
                    //update drink to database
                    put('/drink/editDrink/', editDrink._id, drinkData, (res) => {
                        //add new drink to wit ai
                        post('/wit/addValue',
                            {
                                entitiId: "drinks",
                                value: drinkData.name,
                                expressions: expressionsD
                            }, res => {
                                console.log(res)
                            })
                        clearForm(form);
                        getAllDrink();
                    })
                })
            }
        }
    })
}
var getAllDrink = () => {
    get('/drink/getAllDrink', data => {
        new Promise((resolve, reject) => {
            data.forEach(item => {
                item.optionsName = '';
                dataMenu.find((mn) => {
                    if (mn._id == item.menu) {
                        item.menuName = mn.name;
                    }
                })
            });
            resolve(data)
        }).then((rs) => {
            dataDrink = rs;
            renderTableDrink(rs);
        })
    })
}
getAllDrink();
$('#expressionD').on("keypress", function (e) {
    let expressionC = $('ul.expressionsD')
    if (e.which === 13) {
        let text = $('#expressionD').val();
        if (text != '') {
            expressionsD.push(text);
            expressionC.append(`<li class="list-group-item">${text}<span onclick='removeExpressionD(this)' class="glyphicon glyphicon-remove" style="float:right"></span></li>`)
            $('#expressionD').val('');
        }
    }
});

var removeExpressionD = (e) => {
    let parent = $(e).parent()
    expressionsD.pop(parent.text())
    parent.remove()
}