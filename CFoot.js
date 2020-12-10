function getData()
{
  fetch('http://localhost:2244/newData')
  .then((response) => {
      return response.json();
  })
  .then((res) => {
    demo = document.getElementById('demo');
    demo.innerText = "No. of searches= " + res.count+", "+"CO2 amount = "+ res.co2 + "gm"
  });
}