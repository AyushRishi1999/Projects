package com.mfpe.claimsmicroservice.repo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.mfpe.claimsmicroservice.model.Claim;
import com.mfpe.claimsmicroservice.repository.ClaimRepo;

@SpringBootTest
class ClaimRepoTest {

	@MockBean
	ClaimRepo claimRepo;
	
	@Test
	@DisplayName("Checking if Claim Repo methods Are working or not")
	void testClaimRepo() {
		Optional<Claim> claim = claimRepo.findHospitalIdByclaimId("Claim_001");
		when(claim.get().getStatus()).thenReturn("Pending Action");
		when(claim.get().getDescription()).thenReturn("All the fields are successfully verified! Please wait for furthur action");
		assertEquals("Pending Action", claim.get().getStatus());
		assertEquals("All the fields are successfully verified! Please wait for furthur action", claim.get().getDescription());
	}
}
