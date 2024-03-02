import { updateProfileById } from "../repositories/profile.repository";

export function addSystemProfile() {
  updateProfileById("AAAAAAAAAECAAAAAAAAAAA", {
    displayName: "เบต้าบล็ก",
    shortBio:
      "บัญชีทางการของเบต้าบล็อก\nสามารถสร้างชุมชน oppen source ด้วยกันได้ที่ github.com/UntitleCMS",
  });
}
