export class SessionManager {
  static shift = null;
  static year = null;

  static loadFromStorage() {
    this.shift = localStorage.getItem('v_shift');
    this.year = localStorage.getItem('v_year');
  }

  static setShift(shift) {
    this.shift = shift;
    localStorage.setItem('v_shift', shift);
  }

  static setYear(year) {
    this.year = year;
    localStorage.setItem('v_year', year);
  }

  static isLogged() {
    this.loadFromStorage();
    return (this.shift !== null);
  }

  static clearYear() {
    this.year = null;
    localStorage.removeItem('v_year');
  }

  static logout() {
    this.shift = null;
    this.year = null;
    localStorage.removeItem('v_shift');
    localStorage.removeItem('v_year');
  }

  static getShift() {
    return (this.shift || localStorage.getItem('v_shift'));
  }

  static getYear() {
    return (this.year || localStorage.getItem('v_year'));
  }
}
