
import PasswordCard from "@/components/settings/PasswordCard";
import ProfileSettingsCard from "@/components/settings/ProfileSettingsCard";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Settings</h1>
        <p className="text-sm text-zinc-500">
          Update your profile, security, and legal documents.
        </p>
      </div>
      <ProfileSettingsCard />
      <PasswordCard />
    </div>
  );
}
