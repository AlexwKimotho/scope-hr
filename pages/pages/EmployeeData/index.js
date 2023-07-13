import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { ProductService } from "../../../demo/service/ProductService";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Divisions } from "../../../demo/service/Divisions";


const OragnizationProfile = () => {
  let emptyProduct = {
    id: null,
    name: "",
    image: null,
    description: "",
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "INSTOCK",
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    ProductService.getProducts().then((data) => setProducts(data));
  }, []);

  const countryCodes = [
    { label: "+1", value: "1" },
    { label: "+254", value: "254" },
    // Add more country codes as needed
  ];

  function handleDateOfBirthChange(e) {
    const selectedDate = e.value;
    if (isUnderAge(selectedDate)) {
      // Perform any necessary actions when the user selects an invalid date
      // You can show an error message or handle it based on your requirements
    } else {
      // Update the state with the selected date
      onInputChange(e, "dob");
    }
  }

  function maxAllowedDate() {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    return currentDate;
  }

  function isUnderAge(date) {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    selectedDate.setFullYear(selectedDate.getFullYear() + 18);
    return currentDate < selectedDate;
  }

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };
  const openNew2 = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _product.code = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = event.files; // Array of uploaded files
  
    // Process the uploaded files
    // Example: You can send the files to the server using an API call
    // Replace the following code with your own file upload logic
  
    // Assuming you have an uploadFilesToServer function that handles the file upload
    uploadFilesToServer(uploadedFiles)
      .then((response) => {
        // Handle the server response
        console.log("Files uploaded successfully!");
      })
      .catch((error) => {
        // Handle the error
        console.error("Error uploading files:", error);
      });
  };
  
  const handleProfilePictureUpload = (event) => {
    const uploadedFiles = event.files; // Array of uploaded files
  
    // Process the uploaded profile picture file
    // Example: You can send the file to the server using an API call
    // Replace the following code with your own profile picture upload logic
  
    // Assuming you have an uploadProfilePictureToServer function that handles the file upload
    uploadProfilePictureToServer(uploadedFiles[0])
      .then((response) => {
        // Handle the server response
        console.log("Profile picture uploaded successfully!");
      })
      .catch((error) => {
        // Handle the error
        console.error("Error uploading profile picture:", error);
      });
  };

  

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };



  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="New Employee"
            icon="pi pi-plus"
            severity="sucess"
            className="mr-2"
            onClick={openNew}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            onClick={confirmDeleteSelected}
            disabled={!selectedProducts || !selectedProducts.length}
          />
        </div>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          mode="basic"
          accept="image/*"
          maxFileSize={1000000}
          label="Import"
          chooseLabel="Import"
          className="mr-2 inline-block"
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          severity="help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

 

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title"> Employee Name</span>
        {rowData.name}
      </>
    );
  };
  const genderBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title"> Gender </span>
        {rowData.gender}
      </>
    );
  };



  const divisionBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title"> Division </span>
        {rowData.division}
      </>
    );
  };

  const departmentBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Department</span>
        {rowData.department}
      </>
    );
  };
  const jobtitleBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Job Title</span>
        {rowData.jobtitle}
      </>
    );
  };

  const jobstatusBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Job Status</span>
        {rowData.jobstatus}
      </>
    );
  };


  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          severity="success"
          rounded
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          severity="warning"
          rounded
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Employee Data</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const productDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
    </>
  );
  const deleteProductDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        text
        onClick={hideDeleteProductDialog}
      />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteProduct} />
    </>
  );
  const deleteProductsDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        text
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        text
        onClick={deleteSelectedProducts}
      />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>
{/* start of the table  */}
          <DataTable
            ref={dt}
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Employees"
            globalFilter={globalFilter}
            emptyMessage="No employees found."
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "4rem" }}
            ></Column>
            {/* <Column field="code" header="Code" sortable body={codeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column> */}
            <Column
              field="name"
              header="Employee Name"
              sortable
              body={nameBodyTemplate}
              headerStyle={{ minWidth: "11.5rem" }}
            ></Column>
            {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
            <Column
              field="gender"
              header="Gender"
              body={genderBodyTemplate}
              sortable
              headerStyle={{ minWidth: "12.5rem" }}
            ></Column>
            <Column
              field="division"
              header="Division"
              sortable
              body={divisionBodyTemplate}
              headerStyle={{ minWidth: "12.5rem" }}
            ></Column>
            <Column
              field="department"
              header="Department"
              sortable
              body={departmentBodyTemplate}
              headerStyle={{ minWidth: "15rem", maxWidth: "15rem" }}
            ></Column>
            <Column
              field="Job Title"
              header="Job Title"
              body={jobtitleBodyTemplate}
              sortable
              headerStyle={{ minWidth: "10rem", maxWidth: "15rem" }}
            ></Column>
            <Column
              field="Job Status"
              header="Job Status"
              body={jobstatusBodyTemplate}
              sortable
              headerStyle={{ minWidth: "10rem" }}
            ></Column>

            <Column
              body={actionBodyTemplate}
              headerStyle={{ minWidth: "10rem" }}
            ></Column>
          </DataTable>
          {/* create a new employee form */}
          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            header="Enter Organisation Details"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            {product.image && (
              <img
                src={`/demo/images/product/${product.image}`}
                alt={product.image}
                width="150"
                className="mt-0 mx-auto mb-5 block shadow-2"
              />
            )}
            <div className="field">
              <label htmlFor="name">Employee Name</label>
              <InputText
                id="name"
                value={product.name}
                onChange={(e) => onInputChange(e, "name")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !product.name,
                })}
              />
              {submitted && !product.name && (
                <small className="p-invalid">Name is required.</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="gender">Gender</label>
              <Dropdown
                id="gender"
                value={product.gender}
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
                onChange={(e) => onInputChange(e, "gender")}
                required
                className={classNames({
                  "p-invalid": submitted && !product.gender,
                })}
                placeholder="Select Gender"
              />
              {submitted && !product.gender && (
                <small className="p-invalid">Gender is required.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="dob">Date of Birth</label>
              <Calendar
                id="dob"
                value={product.dob}
                onChange={(e) => onInputChange(e, "dob")}
                dateFormat="yy-mm-dd"
                required
                className={classNames({
                  "p-invalid": submitted && !product.dob,
                })}
              />
              {submitted && !product.dob && (
                <small className="p-invalid">Date of Birth is required.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="maritalStatus">Marital Status</label>
              <Dropdown
                id="maritalStatus"
                value={product.maritalStatus}
                options={[
                  { label: "Single", value: "Single" },
                  { label: "Married", value: "Married" },
                  { label: "Divorced", value: "Divorced" },
                  { label: "Separated", value: "Separated" },
                ]}
                onChange={(e) => onInputChange(e, "maritalStatus")}
                required
                className={classNames({
                  "p-invalid": submitted && !product.maritalStatus,
                })}
                placeholder="Select Marital Status"
              />
              {submitted && !product.maritalStatus && (
                <small className="p-invalid">Marital Status is required.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="idNumber">ID Number</label>
              <InputText
                id="idNumber"
                value={product.idNumber}
                onChange={(e) => onInputChange(e, "idNumber")}
                required
                className={classNames({
                  "p-invalid": submitted && !product.idNumber,
                })}
              />
              {submitted && !product.idNumber && (
                <small className="p-invalid">ID Number is required.</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="kraNumber">KRA Number</label>
              <InputText
                id="kraNumber"
                value={product.kraNumber}
                onChange={(e) => onInputChange(e, "kraNumber")}
                required
                className={classNames({
                  "p-invalid": submitted && !product.kraNumber,
                })}
              />
              {submitted && !product.kraNumber && (
                <small className="p-invalid">KRA Number is required.</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="nssf">NSSF Number</label>
              <InputText
                id="nssf"
                value={product.nssf}
                onChange={(e) => onInputChange(e, "nssf")}
                required
                className={classNames({
                  "p-invalid": submitted && !product.nssf,
                })}
              />
              {submitted && !product.nssf && (
                <small className="p-invalid">NSSF Number is required.</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="nhif">NHIF Number</label>
              <InputText
                id="nhif"
                value={product.nhif}
                onChange={(e) => onInputChange(e, "nhif")}
                required
                className={classNames({
                  "p-invalid": submitted && !product.nhif,
                })}
              />
              {submitted && !product.nhif && (
                <small className="p-invalid">NHIF Number is required.</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="p-inputgroup">
                <Dropdown
                  id="countryCode"
                  value={product.countryCode}
                  options={countryCodes}
                  onChange={(e) => onInputChange(e, "countryCode")}
                  className="country-code-dropdown"
                />
                <InputText
                  id="phoneNumber"
                  value={product.phoneNumber}
                  onChange={(e) => onInputChange(e, "phoneNumber")}
                  required
                  className={classNames({
                    "p-invalid": submitted && !product.phoneNumber,
                  })}
                />
              </div>
              {submitted && !product.phoneNumber && (
                <small className="p-invalid">Phone Number is required.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="nextOfKinName">Next of Kin Name</label>
              <InputText
                id="nextOfKinName"
                value={product.nextOfKinName}
                onChange={(e) => onInputChange(e, "nextOfKinName")}
                required
                className={classNames({
                  "p-invalid": submitted && !product.nextOfKinName,
                })}
              />
              {submitted && !product.nextOfKinName && (
                <small className="p-invalid">
                  Next of Kin Name is required.
                </small>
              )}
            </div>

            <div className="field">
              <label htmlFor="nextOfKinEmail">Next of Kin Email</label>
              <InputText
                id="nextOfKinEmail"
                value={product.nextOfKinEmail}
                onChange={(e) => onInputChange(e, "nextOfKinEmail")}
                required
                className={classNames({
                  "p-invalid": submitted && !product.nextOfKinEmail,
                })}
              />
              {submitted && !product.nextOfKinEmail && (
                <small className="p-invalid">
                  Next of Kin Email is required.
                </small>
              )}
            </div>

            <div className="field">
              <label htmlFor="nextOfKinPhoneNumber">
                Next of Kin Phone Number
              </label>
              <div className="p-inputgroup">
                <Dropdown
                  id="nextOfKinCountryCode"
                  value={product.nextOfKinCountryCode}
                  options={countryCodes}
                  onChange={(e) => onInputChange(e, "nextOfKinCountryCode")}
                  className="country-code-dropdown"
                />
                <InputText
                  id="nextOfKinPhoneNumber"
                  value={product.nextOfKinPhoneNumber}
                  onChange={(e) => onInputChange(e, "nextOfKinPhoneNumber")}
                  required
                  className={classNames({
                    "p-invalid": submitted && !product.nextOfKinPhoneNumber,
                  })}
                />
              </div>
              {submitted && !product.nextOfKinPhoneNumber && (
                <small className="p-invalid">
                  Next of Kin Phone Number is required.
                </small>
              )}
            </div>

            <div className="field">
  <label htmlFor="staffNo">Employee Staff No</label>
  <InputText
    id="staffNo"
    value={product.staffNo}
    onChange={(e) => onInputChange(e, 'staffNo')}
    required
    className={classNames({
      'p-invalid': submitted && !product.staffNo,
    })}
  />
  {submitted && !product.staffNo && (
    <small className="p-invalid">Employee Staff No is required.</small>
  )}
</div>

<div className="field">
  <label htmlFor="division">Division</label>
  <InputText
    id="division"
    value={product.division}
    onChange={(e) => onInputChange(e, 'division')}
    required
    className={classNames({
      'p-invalid': submitted && !product.division,
    })}
  />
  {submitted && !product.division && (
    <small className="p-invalid">Division is required.</small>
  )}
</div>

<div className="field">
  <label htmlFor="department">Department</label>
  <InputText
    id="department"
    value={product.department}
    onChange={(e) => onInputChange(e, 'department')}
    required
    className={classNames({
      'p-invalid': submitted && !product.department,
    })}
  />
  {submitted && !product.department && (
    <small className="p-invalid">Department is required.</small>
  )}
</div>
<div className="field">
  <label htmlFor="jobTitle">Job Title</label>
  <InputText
    id="jobTitle"
    value={product.jobTitle}
    onChange={(e) => onInputChange(e, 'jobTitle')}
    required
    className={classNames({
      'p-invalid': submitted && !product.jobTitle,
    })}
  />
  {submitted && !product.jobTitle && (
    <small className="p-invalid">Job Title is required.</small>
  )}
</div>
<div className="field">
  <label htmlFor="workEmail">Work Email Address</label>
  <InputText
    id="workEmail"
    value={product.workEmail}
    onChange={(e) => onInputChange(e, 'workEmail')}
    required
    className={classNames({
      'p-invalid': submitted && !product.workEmail,
    })}
  />
  {submitted && !product.workEmail && (
    <small className="p-invalid">Work Email Address is required.</small>
  )}
</div>
<div className="field">
  <label htmlFor="reportingTo">Reporting To</label>
  <InputText
    id="reportingTo"
    value={product.reportingTo}
    onChange={(e) => onInputChange(e, 'reportingTo')}
    required
    className={classNames({
      'p-invalid': submitted && !product.reportingTo,
    })}
  />
  {submitted && !product.reportingTo && (
    <small className="p-invalid">Reporting To is required.</small>
  )}
</div>
<div className="field">
  <label htmlFor="jobGrade">Job Grade</label>
  <InputText
    id="jobGrade"
    value={product.jobGrade}
    onChange={(e) => onInputChange(e, 'jobGrade')}
    required
    className={classNames({
      'p-invalid': submitted && !product.jobGrade,
    })}
  />
  {submitted && !product.jobGrade && (
    <small className="p-invalid">Job Grade is required.</small>
  )}
</div>
<div className="field">
  <label htmlFor="employmentDate">Employment Date</label>
  <Calendar
    id="employmentDate"
    value={product.employmentDate}
    onChange={(e) => onInputChange(e, 'employmentDate')}
    dateFormat="yy-mm-dd"
    required
    className={classNames({
      'p-invalid': submitted && !product.employmentDate,
    })}
  />
  {submitted && !product.employmentDate && (
    <small className="p-invalid">Employment Date is required.</small>
  )}
</div>
<div className="field">
  <label htmlFor="leaveRatePerMonth">Leave Computation Rate per Month</label>
  <InputText
    id="leaveRatePerMonth"
    value={product.leaveRatePerMonth}
    onChange={(e) => onInputChange(e, 'leaveRatePerMonth')}
    required
    className={classNames({
      'p-invalid': submitted && !product.leaveRatePerMonth,
    })}
  />
  {submitted && !product.leaveRatePerMonth && (
    <small className="p-invalid">Leave Computation Rate per Month is required.</small>
  )}
</div>
<div className="field">
  <label htmlFor="leaveStartDate">Leave Computation Starting Date</label>
  <Calendar
    id="leaveStartDate"
    value={product.leaveStartDate}
    onChange={(e) => onInputChange(e, 'leaveStartDate')}
    dateFormat="yy-mm-dd"
    required
    className={classNames({
      'p-invalid': submitted && !product.leaveStartDate,
    })}
  />
  {submitted && !product.leaveStartDate && (
    <small className="p-invalid">Leave Computation Starting Date is required.</small>
  )}
</div>
<div className="field">
  <label htmlFor="carryForwardDays">Previous Year Carry Forward Days</label>
  <InputText
    id="carryForwardDays"
    value={product.carryForwardDays}
    onChange={(e) => onInputChange(e, 'carryForwardDays')}
    required
    className={classNames({
      'p-invalid': submitted && !product.carryForwardDays,
    })}
  />
  {submitted && !product.carryForwardDays && (
    <small className="p-invalid">Previous Year Carry Forward Days is required.</small>
  )}

<div className="field">
    <label htmlFor="professionalQualifications">
      Professional Qualifications
    </label>
    <InputTextarea
      id="professionalQualifications"
      value={product.professionalQualifications}
      onChange={(e) => onInputChange(e, "professionalQualifications")}
      required
      rows={3}
      cols={20}
    />
  </div>

<div className="field">
    <label htmlFor="professionalQualifications">
      Professional Qualifications
    </label>
    <InputTextarea
      id="professionalQualifications"
      value={product.professionalQualifications}
      onChange={(e) => onInputChange(e, "professionalQualifications")}
      required
      rows={3}
      cols={20}
    />
  </div>

  {/* Profile Picture Button */}
  <div className="field">
    <label htmlFor="profilePicture">Profile Picture</label>
    <FileUpload
      id="profilePicture"
      name="profilePicture"
      chooseLabel="Choose"
      mode="basic"
      accept="image/*"
      maxFileSize={1000000} // Example maximum file size of 1MB
      uploadHandler={handleProfilePictureUpload} // Replace with your own profile picture upload handler function
    />
  </div>
  {/* File Attachments Import Button */}
  <div className="field">
    <label htmlFor="fileAttachments">File Attachments</label>
    <FileUpload
      id="fileAttachments"
      name="fileAttachments"
      chooseLabel="Import Files"
      mode="basic"
      multiple
      auto
      maxFileSize={10000000} // Example maximum file size of 1MB
      uploadHandler={handleFileUpload} // Replace with your own file upload handler function
    />
  </div>
</div>

          </Dialog>
          {/* end of create employee form */}

          <Dialog
            visible={deleteProductDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteProductDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && (
                <span>
                  Are you sure you want to delete <b>{product.name}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteProductsDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductsDialogFooter}
            onHide={hideDeleteProductsDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && (
                <span>
                  Are you sure you want to delete the selected products?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default OragnizationProfile;
