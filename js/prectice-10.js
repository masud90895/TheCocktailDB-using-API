/* ১০. সিরিয়াস প্রাকটিস 
হয় মডিউল 34 ভালো করে দেখে ফেলো। বিশেষ করে the meal db রি তারপরে আরো সময় থাকলে এর আরেকটা খালতো ভাই the coktaildb থেকে কিছু জিনিস এনে দেখাবে। একজাক্টলি কি দেখাতে হবে। সেটা আমি বলে দিবো না। তুমি ওদের ওয়েবসাইট এ যাও। সেখানে কি কি লেখা আছে সেগুলা পড়ো। api গুলা এর ছোট করে কি কি করে বলা আছে। সেগুলা দেখো। তারপর কিছু ডাটা লোড করো। সেই ডাটাগুলো দেখাও। এইখানে সার্চ ফাংশনালিটি ইমপ্লিমেন্ট করো। অনেকটা mealdb এর মতো। আবার কোন একটাতে ক্লিক করলে সেটার ডিটেল দেখাবে।  */



const cocktail = (id) =>{
    fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${id}`)
    .then(res => res.json())
    .then(data => displayCocktail(data.drinks))
}

document.getElementById('submit-btn').addEventListener('click',function(){
    const inputField = document.getElementById('input-fild');
    const inputFieldValue =inputField.value;
 
    if(inputField.value === ''){
        let timerInterval
        Swal.fire({
          title: 'Please Input What You Want',
          html: 'I will close in <b></b> milliseconds.',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
       return
   }
    cocktail(inputFieldValue) ;
    inputField.value=''

})


const displayCocktail = data =>{
    const cocktailContainer = document.getElementById('cocktail-container');
    if(data === null ){
        Swal.fire({
            icon: 'error',
            title: 'Oops...Chack Search List',
            text: 'Please Input Correct Name..!',
        })
        return
    }
    cocktailContainer.textContent="";
    
    data.forEach(cocktails => {
        const {strDrinkThumb,strDrink,dateModified,strInstructions} = cocktails;
        
        const cocktailContainerDiv =document.createElement('cocktail-container');
        cocktailContainerDiv.classList.add("card","w-full","bg-base-100","shadow-xl");
        cocktailContainerDiv.innerHTML=`
        <figure>
        <img class="w-full" src="${strDrinkThumb}" alt="Shoes" />
        </figure>
        <div class="card-body">
        <h2 class="card-title">${strDrink}!</h2>
        <p>${strInstructions.length > 80 ? strInstructions.slice(0,80) : strInstructions}</p>
         <div class="card-actions justify-end">
         <button onclick="buyNow()" class="btn btn-primary">Buy Now</button>
         </div>
         </div>
        `;
        cocktailContainer.appendChild(cocktailContainerDiv)
    });
}

const buyNow =() =>{
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Your Order Is Received',
    showConfirmButton: false,
    timer: 1500
  })
  return
};

// call fatch function
cocktail('margarita');