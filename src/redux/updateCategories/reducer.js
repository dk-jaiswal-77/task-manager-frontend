const initState = {
    all : 0, 
    personal : 0, 
    official : 0, 
    others : 0
};

export default function updateCategoriesReducer(categories={categories : initState}, {type, payload}){
    switch(type){
        case "UPDATE_CATEGORIES":
            return {categories : payload};
        default:
            return categories;
    }
}