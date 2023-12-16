import {Box, Button, TextField, Container, Typography,Card,IconButton} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const IncrementDecrementCounter = (props) => {
    const onIncrementClicks = () => {
        props.onPlusClick()
    } 
    const onDecrementClicks = () => {
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
            <RemoveCircleOutlineIcon onClick={onDecrementClicks} />
            <Card
                sx={{
                    border:'none',     
                    width: "20px"
                }}>
                {props.dependantCount}
            </Card>
            <IconButton onClick={onIncrementClicks}>
                <AddCircleOutlineIcon />
            </IconButton>
        </Card>
    )
}
export default IncrementDecrementCounter