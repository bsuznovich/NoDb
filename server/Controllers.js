let list = [{
    id: 1,
    list: 'Giant purple people eater'
}, {
    id: 2,
    list: 'A left shoe (not the right one)'
}, {
    id: 3,
    list: 'Baking soda'
}]
let id = 4

module.exports = {
    getList: (req, res) => {
        res.status(200).send(list)
    },

    addToList: (req, res) => {
        console.log('giggity')
        console.log(req.body)
        let newList = {
            id: id,
            list: req.body.text
        }
        list.push(newList)
        console.log(list)
        id++
        res.status(200).send(list)
    },

    removeFromList: (req,res) => {
        let deleteId = req.params.id
        let index = list.findIndex(obj => obj.id == deleteId)
        list.splice(index,1)
        res.status(200).send(list)
    },

    editList(req,res){
            let index = list.findIndex((listItem) => {
                return listItem.id == req.params.id
            })
            console.log(index)
            let editObject = {
                id: req.params.id,
                list: req.body.editInput
            }
            list.splice(index,1,editObject)
            res.status(200).send(list)
    console.log(req.body) }
}