
let cityOption = [];
let allUsers=[];
$.ajax("https://jsonplaceholder.typicode.com/users", {
    success: function (data) {
        allUsers = data
     render(allUsers)
   renderOptions(allUsers)

        }
    }); 

$(".form-select").on("change", function (e) {
  let text = e.target.value;
  let cityFilter = allUsers.filter((item) => {
    return (
      item.address.city.toLowerCase().includes(text.toLowerCase()));
  });
    render(cityFilter);
});

function render(data) {
 $("section .newRow").html('');

            data.map((item) => {
              let col = `
     <div class="card">
       <div class="row p-3">
           <div class="col-8">
               <h4 class="m-0" >${item.name} |  ${item.company.name}</h4>
               <p class="m-0"> ${item.address.street} </p>
           </div>
           <div class="col-4">
               <p class="fs-4"  > ${item.website} </p class="fs-4"  >
               <p class="fs-5 m-0"> ${item.phone} </p>
           </div>
       </div>
           </div>
            `;
              $("section .newRow").append(col);
            });
};

function renderOptions(data) {
    data.map(item => {
    cityOption.push(item.address.city);
  })

 cityOption.map((option) => {
   const cityOptions = `<option value="${option}"> ${option} </option>`;
   $(".form-select").append(cityOptions);
 });
    
};

$('.search').on("input", function (e) {
    let text = e.target.value;
   const searchFilter= allUsers.filter(item => {
        return (
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.company.name.toLowerCase().includes(text.toLowerCase())
        );
    })
    render(searchFilter)
})