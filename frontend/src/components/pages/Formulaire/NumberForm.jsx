import { useEffect } from "react";
import NumberCard from "../../widgets/NumberCard";
import { useState } from "react";
const NumberForm=()=>{
    const [number,setNumber]=useState(0);
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/number-of-form/`)
        .then((response)=>response.json())
        .then((data)=>{
            setNumber(data[0]?.numberForm || 0);
        })
        .catch((error) => {
            console.error('Error fetching number of producers:', error);
        });
    },[]);
    return(
        <div>
            <NumberCard
                number={number}
                title="Nombre de formulaire"
                color="danger"
                
            />
        </div>
        
    )

}
export default NumberForm;