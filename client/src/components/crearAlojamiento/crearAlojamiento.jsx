import React, { useState, useContext, useEffect } from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import NavegacionDePasos from './navegacionDePasos';
import InfoBasica from './infoBasica';
import UbicacionAndPrecio from './ubicacionAndPrecios';
import CaracteristicasAndFotos from './caracteristicasAndFotos';
import VistaDePasos from './vistaDePasos';
import { AuthContext } from '../../context/authContext';
import { crearAlojamiento } from '../../api/api';

const CreateAccommodationView = () => {
    const { id } = useParams();

    const navigate = useNavigate();


    const { user } = React.useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        anfitrion: id,
        nombre: '',
        descripcion: '',
        precioPorNoche: '',
        moneda: 'USD',
        horarioCheckIn: '15:00',
        horarioCheckOut: '11:00',
        direccion: {
            calle: '',
            altura: '',
            ciudad: {
                nombre: '',
                pais: {
                    nombre: ''
                }
            }
        },
        cantHuespedesMax: 1,
        caracteristicas: [],
        fotos: []
    });

    const updateFormData = (updates) => {
        setFormData(prev => ({
            ...prev,
            ...updates
        }));
    };

    const resetForm = () => {
        setFormData({
            anfitrion: id,
            nombre: '',
            descripcion: '',
            precioPorNoche: '',
            moneda: 'USD',
            horarioCheckIn: '15:00',
            horarioCheckOut: '11:00',
            direccion: {
                calle: '',
                numero: '',
                ciudad: {
                    nombre: '',
                    pais: {
                        nombre: ''
                    }
                }
            },
            cantHuespedesMax: 1,
            caracteristicas: [],
            fotos: []
        });
        setCurrentStep(1);
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const canProceedToNextStep = () => {
        switch (currentStep) {
            case 1:
                return formData.nombre && formData.descripcion;
            case 2:
                return formData.direccion && formData.precioPorNoche;
            case 3:
                return formData.fotos.length >= 1;
            default:
                return false;
        }
    };

    const handleSubmit = async () => {
        console.log('Accommodation created:', formData);
        // Here you would typically send the data to your backend

        try {
            const response = await crearAlojamiento(formData)

            console.log('Alojamiento creado exitosamente:', response);
        } catch(error) {
            return
        }

        // Clean up image URLs to prevent memory leaks
        formData.fotos.forEach(image => {
            URL.revokeObjectURL(image.url);
        });

        resetForm();
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <InfoBasica
                        formData={formData}
                        updateFormData={updateFormData}
                    />
                );
            case 2:
                return (
                    <UbicacionAndPrecio
                        formData={formData}
                        updateFormData={updateFormData}
                    />
                );
            case 3:
                return (
                    <CaracteristicasAndFotos
                        formData={formData}
                        updateFormData={updateFormData}
                    />
                );
            default:
                return (
                    <InfoBasica
                        formData={formData}
                        updateFormData={updateFormData}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-black border-b border-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center space-x-2 text-white hover:text-emerald-300 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Volver</span>
                        </button>
                        <div className="flex items-center space-x-2">
                            <Home className="h-5 w-5 text-emerald-300" />
                            <h1 className="text-xl font-semibold text-white">Crear Alojamiento</h1>
                        </div>
                        <div className="w-20"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <VistaDePasos currentStep={currentStep} />

                <form className="space-y-8">
                    {renderCurrentStep()}
                    <NavegacionDePasos
                        currentStep={currentStep}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        canProceedToNextStep={canProceedToNextStep}
                        formData={formData}
                        onSubmit={handleSubmit}
                    />
                </form>
            </div>
        </div>
    );
};

export default CreateAccommodationView;