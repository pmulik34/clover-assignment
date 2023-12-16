import {
    Box, Button, TextField, Container, Typography,
    Card
} from "@mui/material";
import { useRef } from "react";

const taskSlice = ({ name, icon, cardFunction, selected, values }) => {
     const inputRef = useRef(null);

    const parentFunction = () => {
        const task = inputRef.current.target;
        console.log("task hioo",inputRef,task,values);
        cardFunction(values, task)
    }

    return (
        <>

            <Card
                style={{
                    border: `1px solid ${selected ? '#FF6458' : 'grey'}`,
                    width: '80px',
                    height: "80px",
                    padding: "12px",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor:'pointer'
                }}
            onClick={parentFunction}
            >
                <input 
                    type="checkbox" 
                    value={values} 
                    checked={selected} 
                    onClick={(e) => { cardFunction(values, e);console.log("hello",values,e) }} 
                    ref={inputRef}
                />
                <Box>
                    {icon}
                </Box>
                <Typography sx={{ textAlign: 'center', fontSize: '12px' }}>
                    {name}
                </Typography>

            </Card>

        </>
    )
}
export default taskSlice