import { useEffect, useState } from "react";
import axios from 'axios';
import { getPokemon } from "../services/PokemonServices";
import { PokemonCard } from "../components/PokemonCard/PokemonCard";
import { ModalDetalles } from "../components/ModalDetalles";
import { Paginacion } from "../components/Paginacion/Paginacion";

const Pokemones = () => {
    const [pokemon, setPokemon] = useState([]);
    const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [pagina, setPagina] = useState(1);
    const pokemonesPorPagina = 12;

    const indiceInicio = (pagina - 1) * pokemonesPorPagina;
    const indiceFin = indiceInicio + pokemonesPorPagina;
    const pokemonesPaginados = pokemon.slice(indiceInicio, indiceFin);

    const abrirModal = (pokemon) => {
        setPokemonSeleccionado(pokemon);
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setPokemonSeleccionado(null);
    };

    const consultarPokemones = async () => {
        try {
            const pokemons = await getPokemon();
            const detalles = await Promise.all(
                pokemons.map(async (pokemon) => {
                    const res = await axios.get(pokemon.url);
                    const especieRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${res.data.id}/`);

                    return {
                        id: res.data.id,
                        imagen: res.data.sprites.front_default,
                        nombre: res.data.name,
                        generacion: especieRes.data.generation.name,
                        habilidades: res.data.abilities.map(h => h.ability.name),
                        tipo: res.data.types.map(t => t.type.name),
                        peso: res.data.weight,
                        stats: res.data.stats.map(stat => ({
                            nombre: stat.stat.name,
                            valor: stat.base_stat
                        }))
                    };
                })
            );

            setPokemon(detalles);
        } catch (error) {
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        consultarPokemones();
    }, []);

    return (
        <div>
            <div className="text-center mt-5">
                <h1>Pokemones</h1>
                <div className="form-text">
                    Si clickeas sobre cualquier Pokemon, lo puedes ver más a detalle 😉.
                </div>
            </div>

            {cargando ? (
                <div className="d-flex justify-content-center my-5">
                    <img
                        src="/snorlax-sleeping.gif"
                        alt="Cargando..."
                        style={{ maxWidth: "200px" }}
                    />
                </div>
            ) : (
                <>
                    <div className="d-flex justify-content-center m-5 flex-wrap gap-3">
                        <PokemonCard
                            pokemones={pokemonesPaginados}
                            onCardClick={abrirModal}
                        />
                    </div>

                    <Paginacion
                        pagina={pagina}
                        totalPages={Math.ceil(pokemon.length / pokemonesPorPagina)}
                        onPageChange={setPagina}
                    />
                </>
            )}

            {mostrarModal && (
                <ModalDetalles pokemon={pokemonSeleccionado} onClose={cerrarModal} />
            )}
        </div>
    );
};

export { Pokemones };
