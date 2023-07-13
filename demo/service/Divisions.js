export const Divisions = {
  getDivisions() {
    return fetch("/demo/data/divisions.json", {
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((d) => d.data);
  },
};
