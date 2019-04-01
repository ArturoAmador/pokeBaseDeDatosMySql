
$.ajax({
    url:`http://localhost:3000/getPokemons`,
    method:'POST',
    success(res){
        console.log(res);
    },
    error(e){
        console.error(e);
    }
});
