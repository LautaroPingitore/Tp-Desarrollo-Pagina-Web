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
          src={alojamiento?.images?.[0] || "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}
          alt={alojamiento?.nombre || "Alojamiento"}
          className="w-full object-cover rounded-t-lg p-0"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-3 w-3"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody className=" p-1">
        <div className="!mb-0 flex  items-center text-left">
            <Typography variant="h5" color="blue-gray" className="!mb-0 text-sm !text-left text-gray-300 font-semibold">
                {alojamiento?.nombre || "Alojamiento"}
            </Typography>
        </div>
        <Typography color="gray" className="text-xs text-gray-500 text-left">
          ${alojamiento?.precio || 0} USD por noche
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