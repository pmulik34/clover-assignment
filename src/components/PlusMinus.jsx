import {
    Box, Button, TextField, Container, Typography,
    Card,
    IconButton
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';



const PlusMinus = (props) => {
    console.log("props",props);
    const onPlusClicks = () => {
        props.onPlusClick()
    } 
    const onMinusClicks = () => {
        props.onMinusClick()
    } 
    const {onPlusClick, onMinusClick, dependantCount} = props
    return (
        <Card
            style={{
                border: "1px solid #c9c9c9",
                width: '70px',
                height: "20px",
                padding: "5px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "12px",
                gap: "6px",
                boxShadow:'none'

            }}>
            <RemoveCircleOutlineIcon onClick={onMinusClicks} />
            <Card
                sx={{
                    border:'none',     
                    width: "20px"
                }}>
                {props.dependantCount}
            </Card>
            <IconButton onClick={onPlusClicks}>
                <AddCircleOutlineIcon />
            </IconButton>
        </Card>
    )
}
export default PlusMinus