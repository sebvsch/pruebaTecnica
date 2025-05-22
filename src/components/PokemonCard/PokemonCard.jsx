import { useState } from "react";
import { tiposPorColor, tiposTraducidos } from "../../tiposColorEspañol";
import './PokemonCard.css';

const PokemonCard = ({ pokemones, onCardClick }) => {
    return (
        <div className="d-flex flex-wrap justify-content-center gap-3">
            {pokemones.map((pokemon) => (
                <PokemonItem key={pokemon.id} pokemon={pokemon} onClick={onCardClick} />
            ))}
        </div>
    );
};

const PokemonItem = ({ pokemon, onClick }) => {
    const [cargando, setCargando] = useState(false);

    return (
        <div
            title="Click para ver detalles del Pokémon"
            className="border rounded-5 p-3 d-flex flex-column align-items-center pokemon-card"
            style={{ width: '270px', height: '270px', cursor: 'pointer' }}
            onClick={() => onClick(pokemon)}
        >
            {!cargando && (
                <div className="d-flex justify-content-center align-items-center" style={{ height: 120 }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            )}
            <img
                src={pokemon.imagen}
                alt={pokemon.nombre}
                onLoad={() => setCargando(true)}
                style={{ display: cargando ? 'block' : 'none', maxHeight: '120px' }}
            />
            {cargando ? (
                <>
                    <h2 className="mt-2 text-center fw-semibold">
                        {pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1)}
                    </h2>

                    <div className="d-flex gap-1 justify-content-center flex-wrap">
                        {pokemon.tipo.map((tipo, index) => (
                            <span
                                key={index}
                                style={{
                                    backgroundColor: tiposPorColor[tipo],
                                    color: '#fff',
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    fontWeight: '600',
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {tiposTraducidos[tipo] || tipo}
                            </span>
                        ))}
                    </div>

                    <p className="text-center fw-semibold mt-3 text-white rounded-3" style={{ backgroundColor: '#797e87', padding: '2px 8px' }}>
                        Peso: {pokemon.peso} kg
                    </p>
                </>
            ) : (
                <div className="w-100 mt-2">
                    <p className="placeholder-glow text-center mb-2">
                        <span className="placeholder col-6"></span>
                    </p>
                    <div className="d-flex justify-content-center gap-1 mb-2">
                        <span className="placeholder col-4 rounded-pill"></span>
                        <span className="placeholder col-4 rounded-pill"></span>
                    </div>
                    <p className="placeholder-glow text-center mb-0">
                        <span className="placeholder col-5"></span>
                    </p>
                </div>
            )}
        </div>
    )
}


export { PokemonCard };
