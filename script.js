// fetch('last_rank_2025.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log("College data loaded:", data[0]);

//     // Example usage:
//     const userRank = 5000;
//     const userBranch = 'CSE';
//     const userCategory = 'BCB_BOYS';

//     const margin = 5000;
//     const matches = data.filter(college =>
//       college.branch === userBranch &&
//       Math.abs(college[userCategory] - userRank) <= margin
//     );
//     matches.map((clg)=>{
//         const clg_name=clg['NAME OF THE INSTITUTION'];
//         const clg_code=clg['INSTCODE'];
//         const place=clg["PLACE"];
//         const lastRank=clg[userCategory]
//         console.log("->",clg_code,clg_name,place,userBranch,userCategory,lastRank);
//     })
//   })
//   .catch(err => console.error("Error loading JSON:", err));
function predictColleges() {
    const userRank = parseInt(document.getElementById('rank').value);
    const userBranch = document.getElementById('branch').value;
    const userCategory = document.getElementById('category').value.toUpperCase();
  
    const margin = 5000;
  
    fetch('last_rank_2025.json')
      .then(response => response.json())
      .then(data => {
        const matches = data.filter(college =>
          college.branch === userBranch &&
          !isNaN(college[userCategory]) &&
          Math.abs(college[userCategory] - userRank) <= margin
        );
  
        const table = document.getElementById('resultTable');
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
  
        if (matches.length === 0) {
          table.style.display = 'none';
          alert("❌ No matching colleges found.");
          return;
        }
  
        matches.forEach(clg => {
          const row = `<tr>
            <td>${clg['INSTCODE']}</td>
            <td>${clg['NAME OF THE INSTITUTION']}</td>
            <td>${clg['PLACE']}</td>
            <td>${userBranch}</td>
            <td>${userCategory}</td>
            <td>${clg[userCategory]}</td>
          </tr>`;
          tbody.innerHTML += row;
        });
  
        table.style.display = 'table';
      })
      .catch(err => console.error("Error loading JSON:", err));
  }
  