interface IResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number

}

export function calculateExercise(exerciseHours: number [], target:number): IResult{

    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(value=>value > 0).length;
    const average = exerciseHours.reduce((a,b)=>a+b,0)/7;
    const success = average >= target;
    const rating = Math.ceil(average);

    function descriptor(averageHours: number):string{
        
        if(averageHours < 2){
            return "Could be better!";
        }else if((averageHours > 2 && averageHours <= 3)){
            return "Nicely done!";
        }else {
            return "Excellent work!";
        }
    }
    const ratingDescription = descriptor(average);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}


try{
    const args = process.argv;

    if(args.length < 4){
        throw new Error("Not enough arguments.");
    }

    const target = Number(args[2]);

    if(isNaN(target)){
        throw new Error("Provided target value is not a number!");
    }

    const exerciseHours: number[] = args.slice(3).map(value=>{
       
        const arrayValue =  Number(value);

       if(isNaN(arrayValue)){
        throw new Error("One or more provided exercise hours value is not a number!");
       }

       return arrayValue;
    });

    const result: IResult = calculateExercise(exerciseHours, target);
    console.log(result);
}
catch(error: unknown){
    let errorMessage = "Something went wrong. ";
    if(error instanceof Error){
        errorMessage += "Error: " + error.message;
    }
    console.log(errorMessage);
}