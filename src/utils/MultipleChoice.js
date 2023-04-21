export function MultipleClean(choice){
    if(choice ){
        choice = choice.toString();
        choice = choice.replace(/\'/g, "");
        choice = choice.replace(/\[/g, "");
        choice = choice.replace(/\]/g, "");
        choice = choice.replace(/\s*/g, "");
        choice = choice.split(",");
        return choice
    }

}