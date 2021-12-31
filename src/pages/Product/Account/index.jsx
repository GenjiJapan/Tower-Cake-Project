import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Images from "constants/images";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Cookies from "universal-cookie";
import styles from "./Account.module.css";

function Account(props) {
  const cookies = new Cookies();
  const showForm = useSelector((state) => state.form.showForm);
  const account = cookies.get("account");

  const [checked, setChecked] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [genderId, setGenderId] = useState(0);
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  var [accountData, setAccountData] = useState({});

  useEffect(() => {
    getAccount();
  }, []);

  const activeGenderId = (id) => {
    setGenderId(id);
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleInfo();
    await handleImage();
  };

  const getAccount = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    };

    try {
      const res = await axios.get(`/api/admin/user/get`, config);
      console.log("line 36 ~ res", res);

      accountData = res.data.accountModel;
      setAccountData(accountData);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleInfo = async () => {
    const body = {
      Username: account.username,
      FirstName: firstName ? firstName : accountData.firstName,
      LastName: lastName ? lastName : accountData.lastName,
      Email: email ? email : accountData.email,
      Phone: phone ? phone : accountData.phone,
      Gender: genderId ? genderId : accountData.gender,
    };

    try {
      const res = await axios.patch(`/api/user`, body);
      console.log("line 36 ~ res", res);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleImage = async () => {
    const formData = await new FormData();

    // Update the formData object
    await formData.append("Image", selectedFile);
    await formData.append("OwnerName", accountData.username);
    // return console.log("🚀 ~ file: index.jsx ~ line 69 ~ handleImage ~ formData", formData)

    try {
      const res = await axios.post(`/api/images/accounts`, formData);
      console.log("line 36 ~ res", res);

      getAccount();
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={
          showForm === "Profile"
            ? `${styles.account}`
            : `${styles.disable_account}`
        }
      >
        <div className={styles.account_header}>
          <Fade bottom delay={100}>
            <h2>Account information</h2>
          </Fade>
        </div>
        <div className={styles.account_info}>
          <div className={styles.input}>
            <Fade bottom delay={300}>
              <span>First Name</span>
            </Fade>
            <Fade bottom delay={300}>
              <input
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder={accountData.firstName}
              />
            </Fade>
          </div>
          <div className={styles.input}>
            <Fade bottom delay={400}>
              <span>Last Name</span>
            </Fade>
            <Fade bottom delay={500}>
              <input
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder={accountData.lastName}
              />
            </Fade>
          </div>
          <div className={styles.input}>
            <Fade bottom delay={600}>
              <span>Email</span>
            </Fade>
            <Fade bottom delay={700}>
              <input
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder={accountData.email}
              />
            </Fade>
          </div>
          <div className={styles.input}>
            <Fade bottom delay={800}>
              <span>User Name</span>
            </Fade>
            <Fade bottom delay={900}>
              <input
                // onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder={account.username}
                readOnly
              />
            </Fade>
          </div>
          <div className={`${styles.gender} ${styles.input}`}>
            <Fade bottom delay={1000}>
              <span>Gender</span>
            </Fade>
            <Fade bottom delay={1100}>
              <div className={styles.remember}>
                <label>
                  Male
                  <input
                    type="radio"
                    name="gender"
                    defaultChecked={accountData.gender === 1 ? checked : null}
                    onChange={() => activeGenderId(1)}
                  />
                  <span class={styles.checkmark}></span>
                </label>
              </div>
            </Fade>
            <Fade bottom delay={1200}>
              <div className={styles.remember}>
                <label>
                  Female
                  <input
                    type="radio"
                    name="gender"
                    defaultChecked={accountData.gender === 2 ? checked : null}
                    onChange={() => activeGenderId(2)}
                  />
                  <span class={styles.checkmark}></span>
                </label>
              </div>
            </Fade>
            <Fade bottom delay={1300}>
              <div className={styles.remember}>
                <label>
                  Bede
                  <input
                    type="radio"
                    name="gender"
                    defaultChecked={accountData.gender === 3 ? checked : null}
                    onChange={() => activeGenderId(3)}
                  />
                  <span class={styles.checkmark}></span>
                </label>
              </div>
            </Fade>
          </div>
          <div className={styles.input}>
            <Fade bottom delay={1400}>
              <span>Phone number</span>
            </Fade>
            <Fade bottom delay={1500}>
              <input
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder={accountData.phone}
              />
            </Fade>
          </div>
        </div>
        <div className={styles.user_avatar}>
          <div className={styles.avatar}>
            <Zoom delay={100}>
              {image ? (
                <img
                  className={styles.preview_img}
                  src={image}
                  alt="preview image"
                />
              ) : (
                <img
                  src={
                    accountData.avatar ? accountData.avatar : Images.IMG_NULL
                  }
                  alt="user_avt"
                />
              )}
            </Zoom>
          </div>
          <label className={styles.avatar_change_icon}>
            <Zoom delay={100}>
              <FontAwesomeIcon
                className={styles.icon}
                icon={faCamera}
                size="3x"
                style={{ color: "#464646" }}
              />
              <input onChange={onImageChange} name="file_avt" type="file" />
            </Zoom>
          </label>
        </div>
        <div className={styles.account_btn}>
          <Fade bottom delay={1400}>
            <button type="button" className={styles.cancel}>
              Cancel
            </button>
          </Fade>
          <Fade bottom delay={1500}>
            <button type="submit" className={styles.apply}>
              Apply
            </button>
          </Fade>
        </div>
      </form>
    </div>
  );
}
export default Account;
