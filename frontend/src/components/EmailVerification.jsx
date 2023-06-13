import { useState, useEffect } from "react";
import "./EmailVerification.css";
import { getVerification, getRateLimitInfo } from "../services/auth";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const fetchRateLimitInfo = async () => {
      try {
        const response = await getRateLimitInfo(email);
        const rateLimitExceededAt = response.data.rateLimitExceededAt;
        const retryAfter = response.data.retryAfter;
        const elapsedTime = Date.now() - rateLimitExceededAt;
        if (elapsedTime < retryAfter * 1000) {
          setRemainingTime(Math.ceil((retryAfter * 1000 - elapsedTime) / 1000));
        }
      } catch (error) {
        console.error("Error fetching rate limit information:", error);
      }
    };
    if (email) {
      fetchRateLimitInfo();
    }
  }, [email]);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [remainingTime]);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await getVerification(email);
      setMessage(response.data.msg);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 429) {
          const waitTime = Math.ceil(
            (error.response.data.retryAfter * 1000) / 1000
          );
          setRemainingTime(waitTime);
          setMessage(
            "You have exceeded the rate limit for email verification. Please wait."
          );
        } else {
          setMessage(error.response.data.msg);
        }
      } else {
        setMessage("An error occurred while sending the verification email.");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="email-verification-container">
      <h2>Email Verification</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading || remainingTime > 0}>
          {isLoading ? "Sending..." : "Send Verification Email"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      {remainingTime > 0 && (
        <p className="message">
          Please try again in {remainingTime}{" "}
          {remainingTime === 1 ? "second" : "seconds"}.
        </p>
      )}
    </div>
  );
};

export default EmailVerification;
