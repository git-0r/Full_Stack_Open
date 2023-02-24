import express, { Request } from "express";
import {calculateBmi} from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/bmi", (_req: Request, res)=>{
    
    try{
        const height = Number(_req.query.height);
        const weight = Number(_req.query.weight);

        if(isNaN(height) || isNaN(weight)){
            throw new Error("malformatted parameters");
        }

        const bmi = calculateBmi(height, weight);
        res.status(200).json({weight, height, bmi});

    }catch(error: unknown){
        const errorMessage = "Something went wrong. ";
            res.status(500).json({error:error instanceof Error ? error.message : errorMessage});
    }

});

app.post("/exercises", (req: Request, _res)=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const daily_exercises = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target= req.body.target;
    
    try{
        
        if(daily_exercises && target){
            
            const isArrayOfNumbers = daily_exercises.every((element:number)=>{
                const number = Number(element);
                return typeof number === "number" && !isNaN(number);
            });

            if(isArrayOfNumbers && typeof Number(target) === "number"){
    
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const exerciseResult = calculateExercise(daily_exercises,target);
                _res.json(exerciseResult);
            }else{
                _res.status(500).json({
                    error: "malformatted parameters"
                  });
            }
        }
        else{
        _res.status(500).json({
            error: "parameters missing"
          });
        }
    }catch(error){
        _res.status(500).json({
            error: error.message || "Something went wrong!"
          });
        }
    }
);

const PORT = 3004;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});