let autoArray = [];
async function search() {
  const $resultPage = $('.resultPage');
  const keywordSearch = document.getElementById("myInput").value;
  const result = await axios({
    method: 'get',
    url: 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + keywordSearch,
  });

  let IDs = result.data.objectIDs;

  $('#root').replaceWith(`<div id = "searchResult"></div>`)
  const $searchResult = $('#searchResult');
  $searchResult.append(`<div id = "grid" class="columns is-multiline is-mobile"></div>`);
  const $grid = $('#grid');
  $searchResult.on("click", '.detail', showDetails);
  for (let i = 0; i < IDs.length; i++) {
    const result = await axios({
      method: 'get',
      url: 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + IDs[i],
    });
    $grid.append(cards(result));
  }

}

function cards(item) {
  return `<div class="column is-one-quarter">
       <div class="card">
         <div class="card-image">
           <figure class="image is-4by3">
             <img src="${item.data.primaryImage}" alt="Placeholder image">
           </figure>
         </div>
         <div class="card-content">
           <div class="media">
             <div class="media-content">
               <p class="title is-4">${item.data.title}</p>
               <p class="subtitle is-6">${item.data.department}</p>
             </div>
           </div>
            <div class="content">
             ${item.data.objectDate}
             <a href="#">#css</a> <button oID = "${item.data.objectID}" class = "detail">details</button>
             <br>
           </div>
         </div>
       </div>
     </div>`
}

async function showDetails() {
  const $tha = $(event.target).closest(".detail");
  let oID = $tha.prevObject["0"].attributes["oID"].value;
  let comment;
  try {
    const response = await axios({
      method: 'get',
      url: `http://localhost:3000/public/exhibits/${oID}`,
    });
    comment = response.data.result.comment;
  } catch (error) {
    comment = "";
  }

  $('#searchResult').replaceWith(`<div id = "detailPage">
 <div>${comment}</div>
 <textarea id = "comment" class="textarea" value="e.g. Leave your thoughts here..."></textarea><button id = "commentButton" oID = "${oID}">submit</button></div>`);
  const $detailPage = $('#detailPage');
  $detailPage.on("click", '#commentButton', saveComment);
}

function saveComment() {
  const $tha = $(event.target).closest("#commentButton");
  let oID = $tha.prevObject["0"].attributes["oID"].value;
  let comment = document.getElementById("comment").value;
  async function postComment() {
    const response = await axios({
      method: 'post',
      url: `http://localhost:3000/public/exhibits/${oID}`,
      data: {
        "data": {
          "id": oID,
          "comment": comment
        }
      }
    });
    return response;
  }

  postComment();
}

function load() {
  const $root = $('#root');
  $root.on("click", '#searchButton', search);
};

$(function () {
  load();
});

