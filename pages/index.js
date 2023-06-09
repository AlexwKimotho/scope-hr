import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductService } from "../demo/service/ProductService";
import { LayoutContext } from "../layout/context/layoutcontext";

const lineData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
  ],
  datasets: [
    {
      label: "last year",
      data: [],
      fill: false,
      backgroundColor: "#2f4860",
      borderColor: "#2f4860",
      tension: 0.4,
    },
    {
      label: "current year",
      data: [],
      fill: false,
      backgroundColor: "#00bb7e",
      borderColor: "#00bb7e",
      tension: 0.4,
    },
  ],
};

const Dashboard = () => {
  const [products, setProducts] = useState(null);
  const menu1 = useRef(null);
  const menu2 = useRef(null);
  const [lineOptions, setLineOptions] = useState(null);
  const { layoutConfig } = useContext(LayoutContext);
  const [time, setTime] = useState(new Date());
  const [profilePicture, setProfilePicture] = useState(
    "/default-profile-picture.jpg"
  );

  const applyLightTheme = () => {
    const lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    setLineOptions(lineOptions);
  };

  const applyDarkTheme = () => {
    const lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#ebedef",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(160, 167, 181, .3)",
          },
        },
        y: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(160, 167, 181, .3)",
          },
        },
      },
    };

    setLineOptions(lineOptions);
  };

  useEffect(() => {
    ProductService.getProductsSmall().then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    if (layoutConfig.colorScheme === "light") {
      applyLightTheme();
    } else {
      applyDarkTheme();
    }
  }, [layoutConfig.colorScheme]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProfilePicture(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = time.toLocaleDateString(undefined, options);
  const formattedTime = time.toLocaleTimeString();

  return (
    <div className="grid">
      <div className="col-12 lg:col-6 xl:col-10">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <h5>Welcome!</h5>
              <div className="text-500 font-medium text-xl">Admin</div>
            </div>
            <div className="profile-picture-container">
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-picture"
              />
              <div className="profile-picture-overlay">
                <input
                  type="file"
                  onChange={handlePictureChange}
                  accept="image/*"
                />
              </div>
              <br/>
              <input type="file" onChange={handlePictureChange} />
            </div>
          </div>
          <div className="ml-2">
            <h6>Today is {formattedDate}</h6>
            <h6>{formattedTime}</h6>
          </div>
          <div className="flex justify-content-between mt-3">
            <Button
              label="My Profile"
              icon="pi pi-user-edit"
              severity="success"
              className="mr-4"
            />
            <Button
              label="Settings"
              icon="pi pi-th-large"
              severity="success"
              className="mr-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
