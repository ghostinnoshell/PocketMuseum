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
            <a href="#"></a> <button oID = "${item.data.objectID}" class = "detail">details</button>
            <br>
          </div>
        </div>
      </div>
    </div>`
}

async function showDetails() {
    const $tha = $(event.target).closest(".detail");
    let oID = $tha.prevObject["0"].attributes["oID"].value;

    const result = await axios({
        method: 'get',
        url: 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + oID,
    });
    console.log("dsaf");
    console.log(result);

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
 
 <div class="tile is-ancestor">
 <div class="tile is-vertical is-8">
   <div class="tile">
     <div class="tile is-parent is-vertical">
       <article class="tile is-child notification is-primary">
         <p class="title">Description</p>
         <div>Title: ${result.data.title}</div>
       <div>Class: ${result.data.classification}</div>
       <div>Country: ${result.data.country}</div>
       <div>Culture: ${result.data.culture}</div>
       <div>Department: ${result.data.departement}</div>
       <div>Medium: ${result.data.medium}</div>
       <div>Classification: ${result.data.classification}</div>
       <div>Time: ${result.data.objectDate}</div>
       <div>Name: ${result.data.objectName}</div>
       </article>
       
     </div>
     <div class="tile is-parent">
       <article class="tile is-child notification is-info">
         <figure class="image is-4by3">
           <img src="${result.data.primaryImage}">
         </figure>
         <figure class="image is-4by3">
           <img src="${result.data.additionalImages[0]}">
         </figure>
       </article>
     </div>
   </div>
   <div class="tile is-parent">
     <article class="tile is-child notification is-danger">
       <p class="title">Comments</p>
       
       <div class="content">
       <div>${comment}</div>
       <textarea id = "comment" class="textarea" value="e.g. Leave your thoughts here..."></textarea><br><button id = "commentButton" oID = "${oID}">submit</button></div>
       </div>
     </article>
   </div>
 </div>
 <div class="tile is-parent">
   
 </div>
</div>
 
 
 `);
    const $detailPage = $('#detailPage');
    $detailPage.on("click", '#commentButton', saveComment);
}

async function saveComment() {
    $('#comment').replaceWith(document.getElementById("comment").value);
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

$(function() {
    load();
});