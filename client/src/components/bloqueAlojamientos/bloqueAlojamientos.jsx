import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

import { useNavigate } from 'react-router-dom';
 
const BloqueAlojamientos = ({alojamiento}) => {
    const navigate = useNavigate();

    const onSelect = (alojamiento) => {
        navigate(`/alojamientos/${alojamiento?.id || 1}`, { 
            state: { alojamiento } 
        });
    }
  return (
    <Card onClick={() => onSelect(alojamiento)} className="group cursor-pointer w-full max-w-[15rem] h-[12rem] relative bg-black text-white align-center justify-center shadow-none border-none rounded-lg p-0 z-0">
      <CardHeader floated={false} color="blue-gray" className="w-full p-0 m-0">
        <img
          src={alojamiento?.fotos?.[0] || "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}
          alt={alojamiento?.nombre || "Alojamiento"}
          className="w-full object-cover rounded-t-lg p-0"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        
      </CardHeader>
      <CardBody className=" p-1">
        <div className="!mb-0 flex  items-center text-left">
            <Typography variant="h5" color="blue-gray" className="!mb-0 text-sm !text-left text-gray-300 font-semibold">
                {alojamiento?.nombre || "Alojamiento"}
            </Typography>
        </div>
        <Typography color="gray" className="text-xs text-gray-500 text-left">
          ${alojamiento?.precioPorNoche || 0} USD por noche
        </Typography>
    
      </CardBody>
      {/* <CardFooter className="pt-0 text-sm">
        <Button size="sm" fullWidth={true}   className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs">
          Reserve
        </Button>
      </CardFooter> */}
    </Card>
  );
}

export default BloqueAlojamientos;