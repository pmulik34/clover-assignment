import {Box, Button, TextField, Container, Typography,Card} from "@mui/material";
import { useRef } from "react";

const MemberCard = ({ memberName, icon, onClickHandler, selected, values }) => {
    const inputRef = useRef(null);

    const handleClick = () => {
        const event = inputRef.current.target;
        onClickHandler(values, event)
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
                    cursor: 'pointer'
                }}
                onClick={handleClick}
            >
                <input
                    type="checkbox"
                    value={values}
                    checked={selected}
                    onClick={(e) => { onClickHandler(values, e)}}
                    ref={inputRef}
                />
                <Box>{icon}</Box>
                <Typography sx={{ textAlign: 'center', fontSize: '12px' }}>{memberName}</Typography>
            </Card>
        </>
    )
}
export default MemberCard