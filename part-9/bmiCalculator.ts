export function calculateBmi(height: number, weight: number): string{
    // considering weight is in kilograms and height in centimetres(converted to meters)
    const bmi = weight / (Math.pow(height/100,2));

    switch(true){

        case(bmi <= 18.4):
            return "Underweight";
                    case ((bmi >= 18.5) && (bmi <= 24.9)):
                        return "Healthy weight";
                        case (bmi > 25):
                                return "Obese";
                                default:
                                    return "Something went wrong.";
        
    }
}

// for taking input from terminal

try{
    const args = process.argv;
    
    if(args.length < 4){
        throw new Error("Not enough arguments.");
    }

    const height = Number(args[2]);
    const weight = Number(args[3]);

    if(isNaN(height) || isNaN(weight)){
        throw new Error("Provided height or weight values are not numbers.");
    }

    const bmi = calculateBmi(height, weight);
    console.log(bmi);

}catch(error: unknown){

    let errorMessage = "Something went wrong. ";

    if(error instanceof Error){
        errorMessage += "Error: " + error.message;
    }

    console.log(errorMessage);
}