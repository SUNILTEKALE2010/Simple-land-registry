import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import Header from "./components/Header";
import LandCard from "./components/LandCard";
import TransferModal from "./components/TransferModal";
import ABI from "./LandRegistryABI.json";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// <-- PUT YOUR DEPLOYED CONTRACT ADDRESS HERE -->
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const [activeSection, setActiveSection] = useState("register");

  const [landId, setLandId] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  const [landDetails, setLandDetails] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLandId, setModalLandId] = useState("");

  // setup provider (ethers v6 BrowserProvider)
useEffect(() => {
  if (!window.ethereum) {
    toast.error("MetaMask not found. Please install MetaMask.");
    return;
  }

  const p = new ethers.BrowserProvider(window.ethereum);
  setProvider(p);

  // When user switches accounts
  window.ethereum.on("accountsChanged", async (accounts) => {
    if (accounts.length === 0) {
      setAccount(null);
      setSigner(null);
      setContract(null);
      toast.warn("Please connect MetaMask");
    } else {
      const s = await p.getSigner();
      const addr = await s.getAddress();
      const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, s);
      setSigner(s);
      setAccount(addr);
      setContract(ctr);
      toast.info("Account switched");
    }
  });

  // When user switches network
  window.ethereum.on("chainChanged", () => {
    window.location.reload();
  });

  // Cleanup listeners when component unmounts
  return () => {
    window.ethereum.removeAllListeners("accountsChanged");
    window.ethereum.removeAllListeners("chainChanged");
  };
}, []);


  // connect wallet and set signer + contract
  const connectWallet = async () => {
    if (!provider) {
      toast.error("No provider found");
      return;
    }
    try {
      await provider.send("eth_requestAccounts", []);
      const s = await provider.getSigner();
      const addr = await s.getAddress();
      const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, s);
      setSigner(s);
      setAccount(addr);
      setContract(ctr);
      toast.success("Wallet connected");
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect wallet");
    }
  };

  // register land (calls contract.registerLand)
  const onRegister = async () => {
    if (!contract) return toast.warn("Connect wallet first");
    if (!landId.trim() || !ownerName.trim() || !ownerContact.trim())
      return toast.warn("Fill all fields");
    try {
      const tx = await contract.registerLand(
        landId.trim(),
        ownerName.trim(),
        ownerContact.trim()
      );
      toast.info("Transaction sent — waiting for confirmation...");
      await tx.wait();
      toast.success("Land registered ✅");
      setLandDetails({
        landId: landId.trim(),
        ownerName: ownerName.trim(),
        ownerContact: ownerContact.trim(),
        ownerAddress: account,
        isRegistered: true,
      });
      setLandId("");
      setOwnerName("");
      setOwnerContact("");
    } catch (err) {
      console.error(err);
      const msg = err?.error?.message || err?.message || "Transaction failed";
      toast.error(msg);
    }
  };

  // query details
  const onQuery = async () => {
    if (!contract) return toast.warn("Connect wallet first");
    if (!landId.trim()) return toast.warn("Enter Land ID");
    try {
      const resp = await contract.getLandDetails(landId.trim());
      setLandDetails({
        landId: resp[0],
        ownerName: resp[1],
        ownerContact: resp[2],
        ownerAddress: resp[3],
        isRegistered: resp[4],
      });
      toast.success("Details loaded");
      setLandId("");
    } catch (err) {
      console.error(err);
      toast.error("Land not registered or invalid ID");
      setLandDetails(null);
    }
  };

  // open transfer modal (prefill landId)
  const openTransferModal = () => {
    if (!landDetails || !landDetails.isRegistered) {
      toast.warn("Load a registered land first");
      return;
    }
    setModalLandId(landDetails.landId);
    setIsModalOpen(true);
  };

  // handle transfer
  const handleTransfer = async (
    transferLandId,
    newOwnerAddr,
    newOwnerName,
    newOwnerContact
  ) => {
    if (!contract) return toast.warn("Connect wallet first");

    if (!transferLandId || !newOwnerAddr || !newOwnerName || !newOwnerContact) {
      toast.warn("Fill all fields in transfer modal");
      return;
    }

    if (!ethers.isAddress(newOwnerAddr)) {
      toast.error("Invalid new owner address");
      return;
    }

    try {
      const tx = await contract.transferLand(
        transferLandId,
        newOwnerAddr,
        newOwnerName.trim(),
        newOwnerContact.trim()
      );
      toast.info("Transfer transaction sent...");
      await tx.wait();
      toast.success("Ownership transferred ✅");
      setIsModalOpen(false);
      setLandDetails(null); // clear displayed details after transfer
    } catch (err) {
      console.error(err);
      const msg = err?.error?.message || err?.message || "Transfer failed";
      toast.error(msg);
    }
  };

  // ✅ FIX: Only clear details when switching back to Register or Check
  useEffect(() => {
    if (activeSection === "register" || activeSection === "check") {
      setLandDetails(null);
    }
  }, [activeSection]);

  return (
    <>
      <Header account={account} onConnect={connectWallet} />
      <div className="container">
        <div className="section-tabs">
          <button
            className={activeSection === "register" ? "tab active" : "tab"}
            onClick={() => setActiveSection("register")}
          >
            Register Land
          </button>
          <button
            className={activeSection === "check" ? "tab active" : "tab"}
            onClick={() => setActiveSection("check")}
          >
            Check Details
          </button>
          <button
            className={activeSection === "transfer" ? "tab active" : "tab"}
            onClick={() => setActiveSection("transfer")}
          >
            Transfer Ownership
          </button>
        </div>

        <div className="grid">
          <div className="panel">
            {activeSection === "register" && (
              <>
                <h2>Register / Query Land</h2>
                <div className="label">Land ID</div>
                <input
                  value={landId}
                  onChange={(e) => setLandId(e.target.value)}
                  placeholder="e.g. CITY-001"
                />
                <div className="label">Owner Name</div>
                <input
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Owner full name"
                />
                <div className="label">Owner Contact</div>
                <input
                  value={ownerContact}
                  onChange={(e) => setOwnerContact(e.target.value)}
                  placeholder="Phone or email"
                />
                <div style={{ marginTop: 14 }}>
                  <button className="btn primary" onClick={onRegister}>
                    Register Land
                  </button>
                  <button className="btn" onClick={onQuery}>
                    Check Details
                  </button>
                  <button className="btn ghost" onClick={openTransferModal}>
                    Transfer Ownership
                  </button>
                </div>
              </>
            )}

            {activeSection === "check" && (
              <>
                <h2>Check Land Details</h2>
                <div className="label">Enter Land ID</div>
                <input
                  value={landId}
                  onChange={(e) => setLandId(e.target.value)}
                  placeholder="e.g. CITY-001"
                />
                <div style={{ marginTop: 14 }}>
                  <button className="btn primary" onClick={onQuery}>
                    Check Details
                  </button>
                </div>
              </>
            )}

            {activeSection === "transfer" && (
              <>
                <h2>Transfer Ownership</h2>
                <button className="btn primary" onClick={openTransferModal}>
                  Open Transfer Modal
                </button>
              </>
            )}
          </div>

          <div className="panel">
            <h2>Land Details</h2>
            {landDetails ? (
              <LandCard land={landDetails} />
            ) : (
              <div style={{ color: "#9fbbe6" }}>No land selected</div>
            )}
          </div>
        </div>

        <div className="tip">
          Tip: Ensure CONTRACT_ADDRESS in App.js matches your deployed address.
        </div>
      </div>

      <TransferModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTransfer={handleTransfer}
        landId={modalLandId}
      />
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
}
