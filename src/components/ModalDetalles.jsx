import { useState } from "react";
import { tiposTraducidos, tiposPorColor, generacionTraducida, statsTraducidas } from "../tiposColorEspañol";

const ModalDetalles = ({ pokemon, onClose }) => {
    const [cargando, setCargando] = useState(false);

    if (!pokemon) return null;

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body text-center" style={{ minHeight: '300px' }}>
                        {!cargando && (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: 150 }}>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                        )}

                        <img
                            src={pokemon.imagen}
                            alt={pokemon.nombre}
                            onLoad={() => setCargando(true)}
                            style={{ display: cargando ? 'block' : 'none', maxHeight: '200px', margin: '0 auto' }}
                        />

                        {cargando ? (
                            <>
                                <p className="fw-bold" style={{ fontSize: '40px' }}>
                                    {pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1)}
                                </p>
                                <p className="fw-bold">{generacionTraducida[pokemon.generacion] || pokemon.generacion}</p>

                                {pokemon.stats && (
                                    <div className="mt-4">
                                        <h5 className="fw-bold mb-2">Estadísticas base</h5>
                                        <ul className="list-group">
                                            {pokemon.stats.map((stat, index) => (
                                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span className="text-capitalize fw-semibold">
                                                        {statsTraducidas[stat.nombre] || stat.nombre}
                                                    </span>
                                                    <span className="badge bg-primary rounded-pill">{stat.valor}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <p className="mt-3">Peso: {pokemon.peso} kg</p>

                                <div className="d-flex gap-2 justify-content-center flex-wrap">
                                    {pokemon.tipo.map((tipo, i) => (
                                        <span
                                            key={i}
                                            className="badge"
                                            style={{
                                                backgroundColor: tiposPorColor[tipo],
                                                color: "#fff",
                                                padding: "6px 12px",
                                                borderRadius: "12px",
                                                fontWeight: "600",
                                                fontSize: "0.85rem",
                                            }}
                                        >
                                            {tiposTraducidos[tipo] || tipo}
                                        </span>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="placeholder-glow mt-3">
                                <p className="placeholder col-6 mx-auto" style={{ height: '40px' }}></p>
                                <p className="placeholder col-4 mx-auto"></p>

                                <div className="mt-4">
                                    <h5 className="fw-bold mb-2">Estadísticas base</h5>
                                    {[...Array(4)].map((_, i) => (
                                        <p key={i} className="placeholder col-8 mx-auto"></p>
                                    ))}
                                </div>

                                <p className="placeholder col-3 mx-auto mt-3"></p>

                                <div className="d-flex justify-content-center gap-2 mt-2 flex-wrap">
                                    {[...Array(2)].map((_, i) => (
                                        <span key={i} className="placeholder rounded-pill col-2" style={{ height: '28px' }}></span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-danger" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ModalDetalles };
