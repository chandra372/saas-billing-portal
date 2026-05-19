import React, {
  useState,
  useEffect,
} from "react";

const Teams = () => {

  const [teams, setTeams] =
    useState([]);

  const [teamName, setTeamName] =
    useState("");

  useEffect(() => {

    fetchTeams();

  }, []);

  const fetchTeams = () => {

    const mockTeams = [
      {
        id: 1,
        name: "Development Team",
      },

      {
        id: 2,
        name: "Marketing Team",
      },
    ];

    setTeams(mockTeams);
  };

  const handleCreateTeam = async (
    e
  ) => {

    e.preventDefault();

    if (!teamName.trim()) return;

    const newTeam = {
      id: teams.length + 1,
      name: teamName,
    };

    setTeams([
      ...teams,
      newTeam,
    ]);

    setTeamName("");
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-6">

        Teams

      </h1>

      <form
        onSubmit={handleCreateTeam}
        className="mb-6"
      >

        <input
          type="text"
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) =>
            setTeamName(e.target.value)
          }
          className="border p-2 mr-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >

          Create Team

        </button>

      </form>

      <div>

        {
          teams.map((team) => (

            <div
              key={team.id}
              className="p-4 border mb-2 rounded"
            >

              {team.name}

            </div>

          ))
        }

      </div>

    </div>
  );
};

export default Teams;