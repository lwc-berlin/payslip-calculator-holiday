"use client";
import TextField from "@/components/TextField";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(formData);

  const holidayPay = () => {
    const urlaubsTage = formData["urlaubsTage"];
    const svTg = getAvg(
      formData["svTg2"],
      formData["svTg3"],
      formData["svTg4"]
    );
    const bezStd = getAvg(
      formData["bezStd2"],
      formData["bezStd3"],
      formData["bezStd4"]
    );
    const gesamtBrutto = getAvg(
      formData["gesamtBrutto2"],
      formData["gesamtBrutto3"],
      formData["gesamtBrutto4"]
    );
    // = Urlaubstage * (GesamtBezahlteStunden / GesamtSVTage) * (GesamtBrutto / GesamtBezahlteStunden)
    return (urlaubsTage * (bezStd / svTg) * (gesamtBrutto / bezStd)).toFixed(2);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl">
          Your holiday pay:
          {!isNaN(holidayPay()) && <>{holidayPay()}</>}
        </h1>

        <h2 className="font-bold text-3xl">Holidays calculation:</h2>
        <p>You will need the last 4 payslips</p>
        <p>
          For example if you took holidays in April you will receive April's
          payslip in May.
        </p>
        <p>Then you will need payslips from:</p>
        <ul className="list-decimal px-4">
          <li>
            April (received in May <b>only for amount of holiday days</b>)
          </li>
          <li>March (received in April)</li>
          <li>February (received in March)</li>
          <li>January (received in February)</li>
        </ul>
        <p>You will also need to check especific parts of your payslip:</p>
        <ul className="list-disc px-4">
          <li>
            Days of holidays (in April's payslip in the above examnple with
            label: <b>Urlaub Tage</b>)
          </li>
          <li>
            SV-Tage (usually 30 but look for this label in your payslip:{" "}
            <b>SV-Tg.</b>)
          </li>
          <li>
            Total paid hours of previous months (<b>Bez. Std</b> in your payslip
            from points <b>2, 3 and 4</b>)
          </li>
          <li>
            Total gross of previous months (<b>Gesamt-Brutto</b> in your payslip
            from points <b>2, 3 and 4</b>)
          </li>
        </ul>
        <p>Make sure you have all 4 payslips and check this data.</p>
        <form onChange={handleChange} className="w-full max-w-lg">
          <h2 className="text-3xl mb-4">
            From payslip <b>1</b>
          </h2>
          <div className="flex flex-wrap -mx-3 mb-6">
            <TextField
              label="Urlaub Tage"
              name="urlaubsTage"
              value={formData.urlaubTage}
              type="number"
              placeholder={28}
            />
          </div>
        </form>
        <h2 className="text-3xl mb-4">
          From payslip <b>2</b>
        </h2>
        <MonthForm onChange={handleChange} month="2" />
        <h2 className="text-3xl mb-4">
          From payslip <b>3</b>
        </h2>
        <MonthForm onChange={handleChange} month="3" />
        <h2 className="text-3xl mb-4">
          From payslip <b>4</b>
        </h2>
        <MonthForm onChange={handleChange} month="4" />
        <h1 className="text-3xl">
          Your holiday pay:
          {!isNaN(holidayPay()) && <>{holidayPay()}</>}
        </h1>

      </main>
    </div>
  );
}

export function MonthForm({ onChange, month }) {
  const [formData, setFormData] = useState({});

  return (
    <form onChange={onChange} className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <TextField
          label="SV-Tg."
          name={"svTg" + month}
          value={formData.svTg}
          type="number"
          placeholder={30}
        />
        <TextField
          label="Bez. Std"
          name={"bezStd" + month}
          value={formData.bezStd}
          type="number"
          placeholder={140}
        />
        <TextField
          label="Gesamt-Brutto"
          name={"gesamtBrutto" + month}
          value={formData.gesamtBrutto}
          type="number"
          placeholder={1999.99}
        />
      </div>
    </form>
  );
}

export const getAvg = (num1, num2, num3) => {
  const sum = +num1 + +num2 + +num3;
  // const sum = +formData["svTg2"] + +formData["svTg3"] + +formData["svTg4"];
  return sum / 3;
};
