declare namespace DB {
  interface User {
    username: string;
    phone: string;
    password: string;

    isTeamFormSubmitted: boolean;
    isApplyConfirmed: boolean;

    adminLevel: number;
  }
}
